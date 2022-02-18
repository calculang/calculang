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

import path from 'path';

import { getOptions, parseQuery } from 'loader-utils';

import introspection from './index.js';
import global_state from './global_state.js';

// gets called with cul_scope_id=2&cul_parent_scope_id=1 on base, but fails

// never called for cul_scope_id=3?
// "./price-change-reconciliation.cul.js?cul_scope_id=3&cul_parent_scope_id=1"

export default async function loader(content, map, meta) {
  this.cacheable(false);
  if (getOptions(this).memo == false) return content;
  //if (global_state.location.length == 1) debugger;
  if (this.resourceQuery != '' && parseQuery(this.resourceQuery).memoed)
    // see use of +memoed added to query below, TODO validate # executions given updated logic
    return content;
  else {
    //debugger;
    const child_introspection = await introspection(this.resourcePath, {
      memo: false,
    });

    const to_memo = [...child_introspection.cul_functions.values()].filter(
      (d) =>
        d.reason != 'input definition' && // bring this in?
        d.cul_scope_id == 0 && // referring to child introspection call
        d.name.charAt(d.name.length - 1) != '$' // don't memo the memo. Alt: don't create cul_function for it? <-- prob never matters
    );
    // debugger; // how come some results are scope 0 with _?
    // nothing has cul_scope_id=0 in another case, hence problem

    const generated = to_memo
      .map(
        (d) =>
          `

////////// start ${d.name} memo-loader code //////////
//const ${d.name}$m = memoize(999999, isEqual)(${d.name}$);
export const ${d.name}$m = memoize(${d.name}$, JSON.stringify);
export const ${d.name} = (a) => {
  return ${d.name}$m(a);
  // eslint-disable-next-line no-undef
  ${d.name}$(); // never run, but here to "trick" calculang graph logic
};
////////// end ${d.name} memo-loader code //////////

`
      )
      .join('');

    // todo remove base ref below!

    var cleaned = this.resourceQuery
      .replace(/cul_scope_id=\d+/, '')
      .replace(/cul_parent_scope_id=\d+/, '')
      .replace(/&&/, '&')
      .replace('?&', '?');

    var return_val = `
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { ${to_memo
      .map((d) => `${d.name}_ as ${d.name}$`) // don't pollute the _ modifier (=> use as)
      .join(', ')} } from './${path.relative(this.context, this.resourcePath)}${
      this.resourceQuery == '' ? '?' : cleaned + '&'
    }+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!
    
    ${generated}
    `;
    // consider for issue #34 console.log(return_val);
    return return_val; // everything is wrong in this!!!
  }
}
