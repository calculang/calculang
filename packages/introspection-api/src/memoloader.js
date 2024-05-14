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

// developing this to support modularity is last big development for Webpack implementation
// it's messy code, though it was tested/applied very heavily and worked.
// Since Webpack implementation will be superseded I'm not tidying it up now
// So ignore comments which are my notes during development.

import path from 'path';
import fs from 'fs';

import { getOptions, parseQuery } from 'loader-utils';

import introspection from './index.js';
import global_state from './global_state.js';

// gets called with cul_scope_id=2&cul_parent_scope_id=1 on base, but fails

// never called for cul_scope_id=3?
// "./price-change-reconciliation.cul.js?cul_scope_id=3&cul_parent_scope_id=1"

// problem: nomemo doesn't know about renames of all fns !

var iteration = 0;

export default async function loader(content, map, meta) {
  //debugger;
  this.cacheable(false);

  //console.log(this._module.rawRequest)


  
  var temp = global_state;
  var json
  if (1) {
    ///////// TODO ~~ DONE
    ///////// derive global_state.memo_to_nomemo   DONE using workaround iterations, apparently working     /////////

    // TODO
    ///////// then test, REMEMBER that depends on -nomemo, so consider when to update main and how to integrate /////////
    ///////// IN THIS BRANCH memo is broken, but will be fixed with fixes for above /////////
    ///////// TESTS I changed test .cul.js => expect fails and should update snapshots, but obv won't with broken memo for other examples /////////
    var loc = this._compilation.options.entry;//should be using loader-utils? //'/home/declan/MESSING/GitHub/calculang/packages/calculang-testcase-models/manufacturing/revenue-with-demand-curve.cul.js' // global_state.location[0].entrypoint // not available in transform loader, alt?
    var b = path.basename(loc).slice(0, -7)
    var nomemo_introspection_loc = path.dirname(loc) + path.sep + b + '-nomemo.introspection.json' // reading this file only going to work in specific circumstances - not in testcases, currently
    //console.log('nomemo_introspection_loc', nomemo_introspection_loc);
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
    var child_introspection = json;
    child_introspection.cul_scope_ids_to_resource[0] = child_introspection.cul_scope_ids_to_resource[0].replace('-nomemo','')

    // TODO
    // seems like OK to use iteration order in introspection-api run, and re-use it in the calculang-js run
    // not sure why process order would not be consistent in calculang-js so that iteration hack works there too?
    //global_state.memo_to_nomemo = { "0": 0, "2": 1 , "3":2, "5":3, "8": 4, "10": 5}; // TODO replace this static



    //debugger;
    var to_memo

    // only getting here for cul_scope_id = 0,2



              // how to map scope ids?
              // 0,1 nomemo
              // 0,1,2,3 memo
              // 0 should pick 0. 2 should pick 1
              // is there a general approach? or depends on scope id graph?
              // surely it depends, and the way to go is to lookup inputs
              
              // for entrypoint it's easy. for children need to match filename in nomemo cul_scope_ids_to_resource AND
              // parent_cul_scope_id mapping, and thats all?

              // use this.resource/Path ? base and ./?
              // NO use::
              // this._module.rawRequest  <-------
    let cul_scope_id = this.resourceQuery == '' ? 0 : parseQuery(this.resourceQuery).cul_scope_id

    
    let pass = 'transform'
    if (this.rootContext.includes("packages/introspection-api/dist") && cul_scope_id ==0) // replace with options stage:introspection
    {
      global_state.memo_cul_scope_id_to_nomemo = { '0': 0 }
    }
    if (this.rootContext.includes("packages/introspection-api/dist")) // replace with options stage:introspection
    {
      pass = 'introspection-api'
    }
            
            
    let cul_parent_scope_id = this.resourceQuery == '' ? 0 : parseQuery(this.resourceQuery).cul_parent_scope_id
    let cp = global_state.cul_scope_ids_to_resource.get(+cul_parent_scope_id)
    let cul_parent_parent_scope_id = 0;
    //if (cul_scope_id != 0) cul_parent_parent_scope_id =  +parseQuery(cp.slice(cp.indexOf('?'))).cul_parent_scope_id // move to paths/scope paths instead?
    let criteria = 0;// criteria = global_state.memo_cul_scope_id_to_nomemo[cul_parent_parent_scope_id]
    let criteria2 = 0;
      


    // not doing anything, trying iteration:
    // iteration assumptions are bad, do this!
              var memo_parent_scope_id, mapped_parent_scope_id;
              if (this._compilation.options.entry == this._module.rawRequest) {
                // entrypoint
                mapped_parent_scope_id = 0;
                iteration = 0 //needed for both passes
              } else if (pass =='introspection-api') {
                cul_parent_parent_scope_id = +parseQuery(cp.slice(cp.indexOf('?'))).cul_parent_scope_id
                debugger;
                criteria = global_state.memo_cul_scope_id_to_nomemo[cul_parent_parent_scope_id]
                memo_parent_scope_id = +parseQuery(this._module.rawRequest.slice(this._module.rawRequest.indexOf('?'))).cul_parent_scope_id
                //console.log(path.basename(this._module.rawRequest))
                var resource_filename = this._module.rawRequest.slice(0, this._module.rawRequest.indexOf('?'))
                debugger
                // find same resource and map of parent == parent, pretty complete?
                // FAILING HERE because no ? in 0 case
                //console.log(this._compilation.options.entry)
                if (cul_scope_id != 0) {
                  /*mapped_parent_scope_id = Object.entries(child_introspection.cul_scope_ids_to_resource).filter(d => d[1].indexOf(resource_filename) != -1 &&
                  
                  
                    +parseQuery(global_state.cul_scope_ids_to_resource.get(+parseQuery(d[1].slice(d[1].indexOf('?'))).cul_parent_scope_id).cul_parent_scope_id) == global_state.memo_cul_scope_id_to_nomemo[memo_parent_scope_id]);*/
                
                  // sometimes the lookup is parents parent.
                  criteria2 = +Object.entries(child_introspection.cul_scope_ids_to_resource).filter(d => d[1].indexOf(resource_filename) != -1
                  && +parseQuery(d[1].slice(d[1].indexOf('?'))).cul_parent_scope_id == criteria)[0][0]        


                  global_state.memo_cul_scope_id_to_nomemo[cul_scope_id] = criteria2//+mapped_parent_scope_id[0][0]

                  // cul_scope_id 2 run first?

                }
              } else {
                criteria2 = global_state.memo_cul_scope_id_to_nomemo[cul_scope_id]
              }
    
    if (this._compilation.options.entry == this._module.rawRequest) {
      // entrypoint
      iteration = 0 //needed for both passes
    }

    if (pass == 'transform') iteration = global_state.memo_map[cul_scope_id]

    if (getOptions(this).memo == false) return content;
    //if (global_state.location.length == 1) debugger;
    if (this.resourceQuery != '' && parseQuery(this.resourceQuery).memoed)
      // see use of +memoed added to query below, TODO validate # executions given updated logic
      return content;

    let dont_memo = []

    // KNOWN EDGECASE: PAGES WITHOUT FUNCTION DEFINITIONS E.G. ONLY IMPORT-EXPORT

    // BUG? units_ memoized in scope 2? JUST do not add to to_memo
    to_memo = Object.values(child_introspection.cul_functions).filter(
      (d) =>
        d.reason != 'input definition' && // bring this in?
        d.reason != 'implicit import' &&
        d.reason != 'explicit import (renamed)' &&
        d.cul_scope_id == criteria2 && //+global_state.memo_to_nomemo[cul_scope_id] && //*/ && // referring to child introspection call
        d.name.charAt(d.name.length - 1) != '$' // don't memo the memo. Alt: don't create cul_function for it? <-- prob never matters
    ).map(d => ({ ...d, name: d.reason.indexOf('renamed') != -1 ? d.name.slice(0,-1) : d.name /* I need to reverse-engineer names ! */}));


    dont_memo = Object.values(child_introspection.cul_functions).filter(
      (d) =>
        ((d.reason == 'input definition') || // bring this in?
        (d.reason == 'implicit import')) &&
        d.reason.indexOf('renamed') == -1 &&
        d.cul_scope_id == criteria2 && //+global_state.memo_to_nomemo[cul_scope_id] && //*/ && // referring to child introspection call
        d.name.charAt(d.name.length - 1) != '$' // don't memo the memo. Alt: don't create cul_function for it? <-- prob never matters
    );
    // debugger; // how come some results are scope 0 with _?
    // nothing has cul_scope_id=0 in another case, hence problem

    
    global_state.memo_map[cul_scope_id] = iteration

    iteration++;

    // impt!
    dont_memo = to_memo.filter(d => d.name.includes("function")) // SHOULD DO a babel pass to collect exports which are not cul functions ! I needed this doing JS keys_stream stuff

    to_memo = to_memo.filter(d => !d.name.includes("function"))
    
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
    
    
    // WHAT HAPPENED TO JUST MEMO DEFINITIONS?? <-- remember random case
    
    var memo_import_line = `import { ${to_memo
      .map((d) => `${d.name}_ as ${d.name}$`) // don't pollute the _ modifier (=> use as)
      .join(', ') + ((dont_memo.length && to_memo.length) ? ',' : '') + dont_memo.map(d => d.name).join(', ')} } from './${path.relative(this.context, this.resourcePath)}${
      this.resourceQuery == '' ? '?' : cleaned + '&'
    }+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!`

    var return_val = `
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    // import/export non-to memo?

    ${memo_import_line}

    ${dont_memo.length ? `export { ${dont_memo.map(d => d.name).join(', ')} }` : ''}
    
    ${generated}
    `;
    // consider for issue #34 console.log(return_val);
    return return_val;
  }
}
