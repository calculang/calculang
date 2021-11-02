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

// PROBLEM, will this work with existing override stuff, or do i need to replicate rename logic (poor)?
// maybe it works as an update on what developer wrote, for example?
// calling introspection-api is another option
export default function loader(content, map, meta) {
  //debugger;
  var pq = parseQuery;
  if (this.resourceQuery != '' && parseQuery(this.resourceQuery).memoed)
    return content;
  // do this logic based on a loop through content Functions? Exports?
  else
    return `// this is also the only test which uses JS from npm:
    import memoize from 'lru-memoize';
    import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { units_, revenue_, price_, costs_, profit_ } from './base.cul?+memoed';
    
    // Javascript
    const revenue_m = memoize(999999, isEqual)(revenue_);
    const price_m = memoize(999999, isEqual)(price_);
    const units_m = memoize(999999, isEqual)(units_);
    const costs_m = memoize(999999, isEqual)(costs_);
    const profit_m = memoize(999999, isEqual)(profit_);
    
    // calculang
    export const revenue = (a) => {
      return revenue_m(a);
      revenue_(); // never run, but here to "trick" calculang graph logic
    };
    export const price = (a) => {
      return price_m(a);
      price_(); // never run, but here to "trick" calculang graph logic
    };
    export const units = (a) => {
      return units_m(a);
      units_(); // never run, but here to "trick" calculang graph logic
    };
    export const costs = (a) => {
      return costs_m(a);
      costs_(); // never run, but here to "trick" calculang graph logic
    };
    export const profit = (a) => {
      return profit_m(a);
      profit_(); // never run, but here to "trick" calculang graph logic
    };
    
    // note: this pattern is included in testing because this logic
    // may be used behind the scenes, e.g. for issue #1 (memoization loader)
    // This is not something I consider a good modelling pattern!
    `;
  `import memoize from 'lru-memoize';
  import { isEqual } from 'underscore';

  import { revenue_ } from './base.cul?+memoed' // should match st in loader this exactly

  export const revenue_m = memoize(999999, isEqual)(revenue_);

  
  export const revenue = (a) => {
  return revenue_m(a);
  revenue_();
};`;

  return `import memoize from 'lru-memoize';
  import { isEqual } from 'underscore';

  import { revenue_ } from './base.cul?+memoed' // should match st in loader this exactly

  export const revenue_m = memoize(999999, isEqual)(revenue_);

  
  export const revenue = (a) => {
  return revenue_m(a);
  revenue_();
};`;
}
