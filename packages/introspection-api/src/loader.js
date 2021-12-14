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

import global_state from './global_state.js';

import visitor from './visitor';

// calculang files run through this loader. The logic is really in the visitor function, which below is processed on content via babel api
// The additional logic below relates to passing params (cul_scope_id and cul_parent_scope_id) to visitor, based on the resourceQuery

// not using arrow syntax b/c webpack api inserted into 'this'

export default function loader(content, map, meta) {
  //if (global_state.location.length == 1) debugger;
  this.sourceMap; // bool which I should use to make sourcemap code conditional, since its slow to generate... (or maybe not b/c transparency?)
  this.cacheable(false);
  // webpack api docs: "A cacheable loader must have a deterministic result when inputs and dependencies haven't changed. This means the loader shouldn't have dependencies other than those specified with this.addDependency."
  // so I can set to true in rewrite loader if I add all child cul files as dependencies. ?

  const options = getOptions(this);

  //this.getLogger().log(content);

  //this.getLogger().log(this.resourceQuery);

  // this._module.reasons[0].module.dependencies.map((d) =>  (d._module == undefined ? undefined : d._module.loaders))
  //this._module.reasons[0].module.dependencies[10];=
  //HarmonyImportSpecifierDependency {module: null, weak: false, optional: false, loc: SourceLocation, request: 'date-fns/esm/differenceInMonths?cul_scope_id=3&cul_parent_scope_id=0', …}
  // module/_module loaders info not yet created..?

  // loader api this.resourceQuery is carrying values into base nomemo run, how?
  var params =
    this.resourceQuery == '' // find a better way to 0-ise cul_scope_id?
      ? { cul_scope_id: 0 }
      : parseQuery(this.resourceQuery);
  if (global_state.cul_scope_id_counter == 0)
    params = {
      ...parseQuery(this.resourceQuery == '' ? '?' : this.resourceQuery),
      cul_scope_id: 0,
    }; // how was resourceQuery being shared??
  params.cul_scope_id = +params.cul_scope_id;
  params.cul_parent_scope_id = +params.cul_parent_scope_id;

  //if (params.cul_parent_scope_id >= params.cul_scope_id) debugger;

  //this.getLogger().log(JSON.stringify(params));

  const opts = { ...params };
  const transformed = transformSync(content, {
    filename: this.resourcePath, //+ this.resourceQuery, //JSON.stringify(params), // to set sourceFileName
    inputSourceMap: map,
    babelrc: false,
    configFile: false,
    plugins: [[visitor, opts]],
    sourceMaps: true,
  });

  //this.getLogger().log(transformed.code);

  // essential jobs of loader:

  //return { code: transformed.code, map: transformed.map };

  /*console.log(`\n\n\ncul_scope_id = ${JSON.stringify(opts)}`);
  console.log('============== going in ============');
  console.log(
    JSON.stringify({
      location: global_state.location,
      path: this.resourcePath,
      query: this.resourceQuery,
    })
  );
  console.log(content);
*/
  // keeping because helpful, but needs to be done smarter, issue #34 filed
  /*  console.log(`\n\n\ncul_scope_id = ${JSON.stringify(opts)}`);
  console.log('============ going out =========');
  console.log(transformed.code);
*/
  this.callback(null, transformed.code, transformed.map, meta);
  return; // "always return undefined when calling callback()" https://v4.webpack.js.org/api/loaders/
}
