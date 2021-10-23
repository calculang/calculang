import { getOptions, parseQuery } from 'loader-utils';

import { transformSync } from '@babel/core';

import visitor from './visitor';

// calculang files run through this loader. The logic is really in the visitor function, which below is processed on content via babel api
// The additional logic below relates to passing params (cul_scope_id and cul_parent_scope_id) to visitor, based on the resourceQuery

// not using arrow syntax b/c webpack api inserted into 'this'

export default function loader(content, map, meta) {
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

  var params =
    this.resourceQuery == ''
      ? { cul_scope_id: 0 }
      : parseQuery(this.resourceQuery);
  params.cul_scope_id = +params.cul_scope_id;
  params.cul_parent_scope_id = +params.cul_parent_scope_id;

  //this.getLogger().log(JSON.stringify(params));

  const opts = { ...params };
  const transformed = transformSync(content, {
    filename: this.resourcePath, //+ this.resourceQuery, //JSON.stringify(params), // to set sourceFileName
    inputSourceMap: map,
    babelrc: false,
    plugins: [[visitor, opts]],
    sourceMaps: true,
  });

  //this.getLogger().log(transformed.code);

  // essential jobs of loader:

  //return { code: transformed.code, map: transformed.map };

  this.callback(null, transformed.code, transformed.map, meta);
  return; // "always return undefined when calling callback()" https://v4.webpack.js.org/api/loaders/
}
