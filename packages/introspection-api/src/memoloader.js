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

import introspection from './index.js';

import { transformSync } from '@babel/core';

// PROBLEM, will this work with existing override stuff, or do i need to replicate rename logic (poor)?
// maybe it works as an update on what developer wrote, for example?
// calling introspection-api is another option
export default async function loader(content, map, meta) {
  //debugger;
  var pq = parseQuery;
  if (this.resourceQuery != '' && parseQuery(this.resourceQuery).memoed)
    return content;
  // do this logic based on a loop through content Functions? Exports?
  // TODO generate below using output from introspection API call!
  else {
    const child_introspection = await introspection(
      './packages/calculang-testcase-models/manufacturing/base.cul.js',
      {}
    );

    const to_memo = [...child_introspection.cul_functions.values()].filter(
      (d) => d.reason != 'input definition' && d.cul_scope_id == 0
    );

    const generated = to_memo
      .map(
        (d) =>
          `

////////// start ${d.name} memo-loader code //////////
const ${d.name}_m = memoize(999999, isEqual)(${d.name}_);
export const ${d.name} = (a) => {
  return ${d.name}_m(a);
  ${d.name}_(); // never run, but here to "trick" calculang graph logic
};
////////// end ${d.name} memo-loader code //////////

`
      )
      .join('');

    return `
    import memoize from 'lru-memoize';
    import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { ${to_memo
      .map((d) => `${d.name}_`)
      .join(', ')} } from './base.cul?+memoed';
    
    ${generated}
    `;
  }
}
