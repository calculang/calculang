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

import { getOptions, parseQuery } from 'loader-utils';

import { transformSync } from '@babel/core';

import visitor from './visitor';

export default function loader(content, map, meta) {
  this.cacheable(false); // needed?

  const options = getOptions(this);

  options.params =
    this.resourceQuery == ''
      ? { cul_scope_id: 0 }
      : parseQuery(this.resourceQuery);
  options.params.cul_scope_id = +options.params.cul_scope_id;

  //console.table(options.params);
  // parent scope id irrelevant for rewriter

  const transformed = transformSync(content, {
    filename: this.resourcePath, //+ this.resourceQuery, //JSON.stringify(params), // to set sourceFileName, but has no impact
    inputSourceMap: map,
    babelrc: false,
    configFile: false,
    plugins: [[visitor, options]],
    sourceMaps: true,
  });

  console.log(`cul_scope_id = ${options.params.cul_scope_id}`);
  console.log('==================================');
  console.log(transformed.code);

  this.callback(null, transformed.code, transformed.map, meta);
  return; // "always return undefined when calling callback()" https://v4.webpack.js.org/api/loaders/
}
