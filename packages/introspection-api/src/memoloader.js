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
import fs from 'fs';

import { getOptions, parseQuery } from 'loader-utils';

import introspection from './index.js';
import global_state from './global_state.js';

// gets called with cul_scope_id=2&cul_parent_scope_id=1 on base, but fails

// never called for cul_scope_id=3?
// "./price-change-reconciliation.cul.js?cul_scope_id=3&cul_parent_scope_id=1"

// problem: nomemo doesn't know about renames of all fns !

export default async function loader(content, map, meta) {
  this.cacheable(false);
  var temp = global_state;
  var json
  if (1) {
    var loc = '/home/declan/MESSING/GitHub/calculang/packages/calculang-testcase-models/manufacturing/revenue-with-demand-curve.cul.js' // global_state.location[0].entrypoint // not available in transform loader, alt?
    var b = path.basename(loc).slice(0, -7)
    var nomemo_introspection_loc = path.dirname(loc) + path.sep + b + '-nomemo.introspection.json' // reading this file only going to work in specific circumstances - not in testcases, currently
    console.log('nomemo_introspection_loc', nomemo_introspection_loc);
    json = JSON.parse(await fs.readFileSync(nomemo_introspection_loc))
  }
  // OFF ^
    //debugger;

  if (getOptions(this).memo == false) return content;
  //if (global_state.location.length == 1) debugger;
  if (this.resourceQuery != '' && parseQuery(this.resourceQuery).memoed)
    // see use of +memoed added to query below, TODO validate # executions given updated logic
    return content;
  else {
    //debugger;
    //const child_introspection = await introspection(this.resourcePath, {
    //  memo: false,
    //})
    // this is not the same thing:
    const child_introspection = json;

    global_state.memo_to_nomemo = { "0": 0, "2": 1 }; // TODO replace this static

    // how to map scope ids?
    // 0,1 nomemo
    // 0,1,2,3 memo
    // 0 should pick 0. 2 should pick 1
    // is there a general approach? or depends on scope id graph?
    // surely it depends, and the way to go is to lookup inputs
    
    // for entrypoint it's easy. for children need to match filename in nomemo cul_scope_ids_to_resource AND
    // parent_cul_scope_id mapping, and thats all?



    debugger;
    var to_memo
    if (1) {
      // BUG? units_ memoized in scope 2? JUST do not add to to_memo
      let cul_scope_id = this.resourceQuery == '' ? 0 : parseQuery(this.resourceQuery).cul_scope_id
      to_memo = Object.values(child_introspection.cul_functions).filter(
        (d) =>
          d.reason != 'input definition' && // bring this in?
          d.reason.indexOf('renamed') == -1 &&
          d.cul_scope_id == +global_state.memo_to_nomemo[cul_scope_id] && // referring to child introspection call
          d.name.charAt(d.name.length - 1) != '$' // don't memo the memo. Alt: don't create cul_function for it? <-- prob never matters
      );
      // debugger; // how come some results are scope 0 with _?
      // nothing has cul_scope_id=0 in another case, hence problem
    } else {
      to_memo = [{ name: "revenue" }, { name: "price" }, { name: "units" }]
  }
    
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
