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

// this visitor processes calculang files and collects information in global_state
// it doesn't modify code except where necessary, notably to get scoping logic correct (see cul_scope_id logic under ImportDeclaration), also rename logic (but I can remove this?)
// there is a note on scoping logic for calculang in ./index.js

import path1 from 'path';
import global_state from './global_state.js';

// NOTE many comments below are out-of-date, cleanup not complete !

// TODO add narration on cul impacts to code

var parentfn, parentfnOrig;

import { urlToRequest } from 'loader-utils';

export default ({ types: t }) => ({
  name: 'calculang-introspection-api-loader-visitor',
  visitor: {
    Program: {
      enter(path, state) {
        if (state.opts.cul_scope_id == 0) {
          // entry point, => set resource to filename
          global_state.cul_scope_ids_to_resource.set(
            0,
            './' + path1.basename(state.filename) // I made this relative to (try to) avoid leaking absolute paths, but this exacerbates relativity bug https://github.com/calculang/calculang/issues/8 And node_modules ????
          ); //state.opts.entrypoint);  state.filename (absolute)
        }

        // merge scopes logic (create implicit imports) // TODO param -merge, used where?
        // no merging for entry point // TODO make this a default for a merge param?
        if (state.opts.cul_scope_id != 0) {
          // don't do entrypoint, todo also don't do on namespace import case
          // merge definitions in parent scope which aren't sourced in current scope
          [...global_state.cul_functions.values()]
            .filter(
              (d) =>
                d.cul_scope_id == state.opts.cul_parent_scope_id &&
                d.cul_source_scope_id != state.opts.cul_scope_id /*||
                  d.cul_source_scope_id != state.opts.cul_parent_scope_id*/ && // this should become graph logic? Or source_scope_id needs to be maintained in 'as' imports? Fut can have multiple sources ....
                // these can get inherited multiple-deep...
                d.reason != 'input definition' &&
                d.reason != 'definition (renamed)'
            )
            .forEach((d) => {
              // create definition in current scope
              global_state.cul_functions.set(
                `${state.opts.cul_scope_id}_${d.name}`,
                {
                  cul_scope_id: state.opts.cul_scope_id,
                  name: d.name,
                  cul_source_scope_id: d.cul_source_scope_id,
                  reason: 'implicit import',
                }
              );
              // create link to source
              global_state.cul_links.add({
                to: `${state.opts.cul_scope_id}_${d.name}`,
                from: `${d.cul_source_scope_id}_${d.name}`,
                reason: 'implicit import',
              });
            });
        }
      },
    },
    Function: {
      enter(path, { opts }) {
        // TODO ignore annon fns ?

        var name = path.parent.id?.name;
        if (name == undefined) return; // not an arrow fn, but esp. not annon. TODO more complete allowances
        var reason = 'definition';

        parentfn = name || 'bug_name';
        parentfnOrig = name || 'bug_name';

        // rename already-scoped definitions (merged from a parent scope)

        // still needed
        if (global_state.cul_functions.get(`${opts.cul_scope_id}_${name}`)) {
          path.parent.id.name += '_';
          parentfn += '_'; // update this one, not Orig
          reason = 'definition (renamed)';
        }

        // create definition
        global_state.cul_functions.set(
          `${opts.cul_scope_id}_${path.parent.id.name}`,
          {
            cul_scope_id: opts.cul_scope_id,
            name: path.parent.id.name,
            cul_source_scope_id: opts.cul_scope_id,
            reason,
          }
        );
      },
      exit() {
        parentfn = undefined;
        parentfnOrig = undefined;
      },
    },
    // convention to define e.g. an input called time is `export const time = () => time_in`
    // time_in is an identifier and input logic is below:
    Identifier(path, state) {
      // use original parentfn to match only, so inputs coded always coded as X = () => (X_in) even if X renamed to X_ due to override
      // I think this is sensible; you wouldn't hook such a formula into model unless you wanted the input (if not hooked up no impact as input will flow to no nodes)
      if (path.node.name == `${parentfnOrig}_in`) {
        // create input definition
        global_state.cul_functions.set(
          `${state.opts.cul_scope_id}_${path.node.name}`, // TODO: can remove scope concept for input definitions? May have dupes, but dupes not feeding into 1 model (I think)
          {
            cul_scope_id: state.opts.cul_scope_id,
            name: path.node.name, // units_in
            cul_source_scope_id: state.opts.cul_scope_id,
            reason: 'input definition',
          }
        );
        // and create link
        var link = {
          to: `${state.opts.cul_scope_id}_${parentfn}`,
          from: `${state.opts.cul_scope_id}_${path.node.name}`,
          reason: 'input',
        };
        // don't include dupes of inputs, just for more readable graphs (e.g. goalseek case)
        // doesn't work, see https://stackoverflow.com/questions/29759480/how-to-customize-object-equality-for-javascript-set
        //if (!global_state.cul_links.has(link)) global_state.cul_links.add(link);
        // inefficient but quick alt.
        if (
          [...global_state.cul_links]
            .map((d) => JSON.stringify(d))
            .indexOf(JSON.stringify(link)) == -1
        )
          global_state.cul_links.add(link);
      }
    },
    ImportDeclaration(path, { opts, ...state }) {
      // I need to return for any parent... or not run for implicits merged
      //if (path.node.source.value.includes(gs.cul_scope_ids_to_resource.get(0)))
      //return;

      if (!path.node.source.value.includes('.cul')) return;
      // could we use webpack resolver here?

      // cul[_parent]_scope_id logic added here:
      // A note on calculang scoping logic is in ./index.js
      var q = `${
        path.node.source.value.includes('?') ? '&' : '?'
      }cul_scope_id=${++global_state.cul_scope_id_counter}&cul_parent_scope_id=${
        opts.cul_scope_id
      }`;

      // I need to remove any cul_scope_id, cul_parent_scope_id already present in path.node.source.value (without removing +memo etc.)
      // Not removing &/? I still get e.g. ./base.cul.js?&&+memoed&cul_scope_id=3&cul_parent_scope_id=2
      // refactor to above?

      global_state.cul_scope_ids_to_resource.set(
        global_state.cul_scope_id_counter,
        urlToRequest(
          path.node.source.value
            .replace(/cul_scope_id=\d+/, '')
            .replace(/cul_parent_scope_id=\d+/, ''),
          state.filename
        ) + q // TODO does this work for node modules?, this could be path.node.source.value + q ?
      );
      // """we always add a cul_scope_id, even though import may be javascript and not cul""" this is no longer true
      // but javascript won't be followed up on, as won't run in cul loader => won't get a cul_scope_ids_to_resource entry, and rewriter must not manipulate // TODO (partially out of date comment) ?

      // import_sources_to_resource used to ensure same source in a scope doesn't lead to diff scope ids eff being used
      var l = global_state.import_sources_to_resource.get(
        `${opts.cul_scope_id}_${path.node.source.value}`
      );

      if (l != undefined) path.node.source.value = l;
      else {
        global_state.import_sources_to_resource.set(
          `${opts.cul_scope_id}_${path.node.source.value}`,
          path.node.source.value
            .replace(/cul_scope_id=\d+/, '')
            .replace(/cul_parent_scope_id=\d+/, '') + q
        );
        path.node.source.value =
          path.node.source.value
            .replace(/cul_scope_id=\d+/, '')
            .replace(/cul_parent_scope_id=\d+/, '') + q;
      }

      // TODO ImportNamespaceSpecifier => hint that at graph build populate all defns (include 'as')
      // TODO ImportDefaultSpecifier => " (basically/exactly the same?) NO this one is meaningless as I don't use default?
      // TODO import all_cul, where merge occurs
      // import * as xyz from... don't deal with for now, // TODO
      if (path.node.specifiers[0].type == 'ImportNamespaceSpecifier') return; // local.name
      // import x from...
      if (path.node.specifiers[0].type == 'ImportDefaultSpecifier') return; // local.name

      // for each import (specifier cases), create a definition in current scope, and link to source (explicit imports)
      // TODO ImportNamespaceSpecifier/all_cul case create hint instead and do this in graph build
      path.node.specifiers.forEach((d) => {
        // create definition
        global_state.cul_functions.set(`${opts.cul_scope_id}_${d.local.name}`, {
          cul_scope_id: opts.cul_scope_id,
          name: d.local.name,
          cul_source_scope_id: global_state.cul_scope_id_counter, // maybe this is wrong in 'as' case? no, E sep. definition...
          reason: 'explicit import',
        });
        // and create link
        global_state.cul_links.add({
          to: `${opts.cul_scope_id}_${d.local.name}`,
          from: `${global_state.cul_scope_id_counter}_${d.imported.name}`, // ? fails on import addMonths from 'date-fns/esm/addMonths' ?
          reason: 'explicit import',
        });
      });
    },
    CallExpression(path, state) {
      // BUG ? getting multiple links in set for individual calls. These differ when negs differ
      // does neg logic need to apply over all?
      // i.e. some dupe links in graph that are invisible

      // cul calls never have >1 argument
      if (path.node.arguments?.length > 1) return;
      // if cul calls have 1 argument, its an ObjectExpression
      if (
        path.node.arguments?.length == 1 &&
        path.node.arguments[0].type != 'ObjectExpression'
      )
        return; // result.push({obj}) doesn't return....

      // TODO edge cases: the ultimate criteria: cul calls always have a definition in scope at this point? but do they: all Functions probably not done?
      // or OK because a JS call won't have any impact? At least Rewriter can tell its not a cul call ('to' in link won't exist - any other issue caused? No issue. No node/node doesn't have cul scope info attached; graphlib/dot writer creates an empty node assocd. with link)
      // TODO rewriter:

      // TODO clean up this mess of guards...
      // TODO do not neg parentfn_in e.g. for goalseek purposes vs. put this exception in rewriter?
      var negs;
      if (
        path.node.arguments == undefined ||
        path.node.arguments[0] == undefined
      )
        negs = [];
      else
        negs = path.node.arguments[0].properties?.map((d) => d.key.name) || [];

      // pupulate negs from _ins defined in JS scope e.g. [10,11].map(price_in => { price_in, revenue()})) : price_in is a neg to revenue call if revenue depends on it
      negs = negs.concat(
        Object.keys(path.scope.getAllBindings()).filter((d) => /_in?$/.test(d))
      ); // push defined _ins in scope (no filter for dependence)

      global_state.cul_links.add({
        to: `${state.opts.cul_scope_id}_${parentfn}`,
        from: `${state.opts.cul_scope_id}_${path.node.callee.name}`, // TODO develop logic for method calls (console.log=undefined) result.push({obj}) ignore
        reason: 'call',
        negs,
      });
    },
  },
});
