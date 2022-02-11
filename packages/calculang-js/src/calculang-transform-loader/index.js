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

var chk = 0;

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
    generatorOpts: { /*compact: true*/ retainLines: true },
    configFile: false,
    plugins: [[visitor, options]],
    sourceMaps: true,
  });

  // make transformed_esm = transformed, but remapping import sources using cul_scope_ids_to_resource where there is a match.
  // is calling this feat esm legit?
  // if cul_scope_ids_to_resource ignores non-cul, then to extent esm in we have got esm out
  // => verbose becomes esm.

  // keeping because helpful, but needs to be done smarter, issue #34 filed
  /*console.log(`\n\n\ncul_scope_id = ${options.params.cul_scope_id}`);
  console.log('==================================');
  console.log(transformed.code);*/
  //if (!chk) this.emitFile('verbose/b', transformed.code);
  this.emitFile(`verbose/${options.params.cul_scope_id}.js`, transformed.code); // fut also replace (link up correctly) import refs here

  this.callback(null, transformed.code, transformed.map, meta);
  return; // "always return undefined when calling callback()" https://v4.webpack.js.org/api/loaders/
}
