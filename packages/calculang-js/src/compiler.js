/*
Copyright (C) 2021  DCN Consulting Ltd (incorporated in Ireland)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3,
as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// compiler is implemented as a call to webpack v4 (atm) api with a loader setup to transform source code (via babel with a custom loader: calculang-transform-loader).
// The output is a Javascript bundle and sourcemap created by webpack, according to configuration below.
// pre-processed calculang information is needed to complete the compile, this comes from the introspection api call below, where results are passed to calculang-transform-loader via options.

import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

import introspection from '@calculang/introspection-api';

export default async (entrypoint, options = {}) => {
  const introspection_info = await introspection(entrypoint, options);

  // now pass this information to loader via options in loader config:

  // run webpack code
  const compiler = webpack({
    context: __dirname,
    entry: `${path.resolve(entrypoint)}`, // any way to get this running relative?
    devtool: 'source-map',
    output: {
      //path: path.resolve(__dirname),
      filename: path.basename(entrypoint, '.cul.js') + '.js', // gets rid of .cul
      libraryTarget: 'umd', // for most of dev was commonjs2, but didn't work well for browser? And I don't want sep. browser/nodejs bundles. Is ESM an eventual solution here?
      globalObject: 'this', // for UMD in browser,node

      // https://github.com/webpack/webpack/issues/3603#issuecomment-357664819 useful discussion
      devtoolModuleFilenameTemplate(info) {
        // replaceAll below requires node 15.x => upgrading (ex- tests STALLED!!) polyfill vs bin compatability?
        return `webpack:///${path
          .relative(__dirname, info.absoluteResourcePath)
          .replaceAll(/\\/g, '/')}`; // do I need to add info.loaders?
      },
    },
    optimization: {
      minimize: false,
      concatenateModules: false, // Do this temporarily because concatenated modules leaks absolute paths - TODO fix!
      //runtimeChunk: true, results in a 0.bundle.js without bootstrap, just model code bundled as jsonP
    },
    module: {
      rules: [
        {
          test: /\.cul/,
          use: {
            loader: path.resolve(
              __dirname,
              './calculang-transform-loader/index.js'
            ),
            options: { ...options, outputLocation: '', ...introspection_info }, // introspection_info is a large object, what is the cost here?
          },
        },
        {
          test: /\.sl/, // this was an earlier development extension (seed-lang!), keeping configured, because I still want to run my .sl files for a little while
          use: {
            loader: path.resolve(
              __dirname,
              './calculang-transform-loader/index.js'
            ),
            options: { ...options, outputLocation: '', ...introspection_info },
          },
        },
      ],
    },
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume()); // will it be better to use disk directly?
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      //console.log(Object.keys(stats.compilation.assets));

      resolve({
        bundle:
          stats.compilation.assets[
            path.basename(entrypoint, '.cul.js') + '.js'
          ].source(),
        sourcemap:
          stats.compilation.assets[
            path.basename(entrypoint, '.cul.js') + '.js.map'
          ].source(),
      });
    });
  });
};
