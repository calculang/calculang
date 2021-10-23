import { getOptions, parseQuery } from 'loader-utils';

import { transformSync } from '@babel/core';

// PROBLEM, will this work with existing override stuff, or do i need to replicate rename logic (poor)?
// maybe it works as an update on what developer wrote, for example?
export default function loader(content, map, meta) {
  //debugger;
  var pq = parseQuery;
  if (this.resourceQuery != '' && parseQuery(this.resourceQuery).memoed)
    return content;
  // do this logic based on a loop through content Functions? Exports?
  else
    return `import memoize from 'lru-memoize';
  import { isEqual } from 'underscore';

  import { revenue_ } from './base.cul?+memoed' // should match st in loader this exactly

  export const revenue_m = memoize(999999, isEqual)(revenue_);

  
  export const revenue = (a) => {
  return revenue_m(a);
  revenue_();
};`;
}
