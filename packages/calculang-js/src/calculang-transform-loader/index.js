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

  this.callback(null, transformed.code, transformed.map, meta);
  return; // "always return undefined when calling callback()" https://v4.webpack.js.org/api/loaders/
}
