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
    return `import memoize from 'lru-memoize';
  import { isEqual } from 'underscore';

  import { revenue_ } from './base.cul?+memoed' // should match st in loader this exactly

  export const revenue_m = memoize(999999, isEqual)(revenue_);

  
  export const revenue = (a) => {
  return revenue_m(a);
  revenue_();
};`;
}
