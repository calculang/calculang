// SPDX-License-Identifier: AGPL-3.0-only
// Declan Naughton

// from github.com/declann/calculang-js-browser-dev 2ca4577

// from metal 877f41f618a754e1f6142c43346ee5e284809bd1


// from develop-with-framework 6f3faaaf134ecc9c7f516fc492df5b71a957b167

// from editable-flowers

//const babel = require('@babel/standalone')

//https://unpkg.com/@babel/standalone/babel.min.js
//import {require} from "https://cdn.jsdelivr.net/npm/d3-require/+esm";

//import * as Babel from 'https://unpkg.com/@babel/standalone/babel.js';
import * as Babel from 'https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.10/+esm' // moved to latest 26/6, still pinning
//const Babel = await require("@babel/standalone")


//console.log('hello', babel)

// Framework-only


import * as G from 'https://cdn.jsdelivr.net/npm/@dagrejs/graphlib/+esm'
//const G = await require("@dagrejs/graphlib")
const alg = G.alg;

// I used 2 for the original here
export const introspection = async (entrypoint, fs) => {

  let global_state = {
    cul_functions: new Map(), // map of <cul_scope_id>_<name> -> {cul_scope_id, name, inputs (array), cul_source_scope_id, reason=definition|definition (renamed)|input definition|explicit import}
    cul_links: new Set(), // Array sometimes !!! // calls, imports, renames go here: Set of { to, from, reason=call|explicit import|implicit import }
    cul_scope_id_counter: 0,
    cul_parent_scope_id: 0,
    cul_scope_ids_to_resource: new Map(),
    import_sources_to_resource: new Map(),
    cul_input_map: new Map(), // map of <cul_scope_id>_<name> -> set of inputs
  }, parentfn, parentfnOrig

  async function introspection_(entrypoint, fs, opts /* {cul_scope_id, cul_parent_scope_id} */) {
    //global_state.cul_scope_id_counter = 0;
    //let cul_scope_id = global_state.cul_scope_id_counter
    //global_state.cul_parent_scope_id = global_state.cul_scope_id_counter;
    // parse for imports of .cul.js
    // recursively call introspection_, mutating introspection
    // not precisely same as below, due to multiple calls/mutation, but otherwise refactor/reuse that Babel plugin?

    let state = ({ opts })

    let next = []; // next imports to traverse


    // pass to know order to traverse.
    // must be own pass because introspection shouldn't process a scope
    // without previous scopes being complete.
    // ex-Webpack ensured this
    let code = fs ? fs[entrypoint] : await (await fetch(entrypoint)).text();

    Babel.transform(code, {
      plugins: [
        [({ types }) =>
        ({
          name: 'calculang-introspection-api-loader-visitor',
          visitor: {
            Program: {
              enter() {
                if (opts.cul_scope_id == 0) {
                  global_state.cul_scope_ids_to_resource.set(
                    0,
                    entrypoint
                  );
                }

                // merge scopes logic (create implicit imports) // TODO param -merge, used where?
                // no merging for entry point // TODO make this a default for a merge param?
                if (opts.cul_scope_id != 0) {
                  // don't do entrypoint, todo also don't do on namespace import case
                  // merge definitions in parent scope which aren't sourced in current scope
                  [...global_state.cul_functions.values()]
                    .filter(
                      (d) =>
                        d.cul_scope_id == opts.cul_parent_scope_id &&
                        d.cul_source_scope_id != opts.cul_scope_id &&
                        d.name[d.name.length - 1] != '_' && // don't inherit modified fns
                        d.reason != 'input definition' // is this a bad exclusion? /*&&
                      //d.reason != 'definition (renamed)'*/
                    )
                    .forEach((d) => {
                      // create definition in current scope
                      global_state.cul_functions.set(
                        `${opts.cul_scope_id}_${d.name}`,
                        {
                          cul_scope_id: opts.cul_scope_id,
                          name: d.name,
                          cul_source_scope_id: d.cul_source_scope_id,
                          reason: 'implicit import',
                        }
                      );
                      // create link to source
                      global_state.cul_links.add({
                        to: `${opts.cul_scope_id}_${d.name}`,
                        from: `${d.cul_source_scope_id}_${d.name}`,
                        reason: 'implicit import',
                      });
                    });
                }
              },
              exit() { },
            },


            Function: {
              enter(path) {
                // TODO ignore annon fns ?

                var name = path.parent.id?.name;
                if (name == undefined) return; // not an arrow fn, but esp. not annon. TODO more complete allowances
                var reason = 'definition';

                parentfn = name || 'bug_name';
                parentfnOrig = name || 'bug_name';

                // rename already-scoped definitions (already merged from a parent scope) : apply _ modifier
                if (global_state.cul_functions.get(`${opts.cul_scope_id}_${name}`)) {
                  path.parent.id.name += '_';
                  parentfn += '_'; // update this one, not Orig
                  reason = 'definition (renamed)'; // do this even when implicit import was blocked? or where E explicit import in parent for _

                  // now references to the function need to be updated
                  [...global_state.cul_functions.values()]
                    .filter(
                      (d) =>
                        d.imported /* I need imported here */ == name &&
                        (d.reason.indexOf('explicit import') != -1) && // function is imported explicitly
                        d.cul_scope_id == opts.cul_parent_scope_id // new, post-working/tests
                        && d.cul_source_scope_id == opts.cul_scope_id // Nov 2023 #117
                    )
                    .forEach((d) => {
                      global_state.cul_functions.set(`${d.cul_scope_id}_${d.name}`, {
                        ...d,
                        imported: d.imported + '_', // here. Only do this when? 
                      });
                      global_state.cul_links.forEach((dd) => {
                        if (
                          dd.to == `${d.cul_scope_id}_${d.name}` &&
                          dd.reason == 'explicit import' // -> indexOf?
                        ) {
                          dd.from += '_'; // add (renamed)?
                          dd.reason += ' (renamed)';
                        }
                      });
                    }); // do I need local and imported in cul_functions? Yes: for now just set imported (name=>local)
                }

                // create definition
                global_state.cul_functions.set(
                  `${opts.cul_scope_id}_${path.parent.id.name}`,
                  {
                    cul_scope_id: opts.cul_scope_id,
                    name: path.parent.id.name,
                    cul_source_scope_id: opts.cul_scope_id,
                    reason,
                    loc: path.node.loc
                  }
                );
              },
              exit(path) {
                // exclude anon fns, as above, closes #143
                var name = path.parent.id?.name;
                if (name == undefined) return;

                parentfn = undefined;
                parentfnOrig = undefined;
              },
            },
            // convention to define e.g. an input called time is `export const time = () => time_in`
            // time_in is an identifier and input logic is below:
            Identifier(path) {
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

            ExportSpecifier(path) {
              var renamed = global_state.cul_functions.has(
                `${opts.cul_scope_id}_${path.node.local.name}_` // isn't this limited?
              );
              if (renamed) path.node.local.name += '_';
            },


            // TODO
            ImportDeclaration(path) {
              if (!path.node.source.value.includes('.cul')) return;

              var q = `${path.node.source.value.includes('?') ? '&' : '?'
                }cul_scope_id=${++global_state.cul_scope_id_counter}&cul_parent_scope_id=${opts.cul_scope_id
                }`

              global_state.cul_scope_ids_to_resource.set(
                global_state.cul_scope_id_counter,
                path.node.source.value
                  .replace(/cul_scope_id=\d+/, '')
                  .replace(/cul_parent_scope_id=\d+/, '') // vs do this in code/memoloader?
                + q
              );
              next.push(global_state.cul_scope_id_counter)


              // import_sources_to_resource (basically a dictionary) used to ensure same source in a scope doesn't lead to diff scope ids eff being used
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
              //if (path.node.specifiers[0] == undefined) debugger;
              if (path.node.specifiers[0].type == 'ImportNamespaceSpecifier') return; // local.name
              // import x from...
              if (path.node.specifiers[0].type == 'ImportDefaultSpecifier') return; // local.name

              // for each import (specifier cases), create a definition in current scope, and link to source (explicit imports)
              // TODO ImportNamespaceSpecifier/all_cul case create hint instead and do this in graph build
              path.node.specifiers.forEach((d) => {
                // no implicits exclusion because imports not actually added in introspection-api pass (see Program visitor)

                // is rename here necessary given its in calculang-js that it matters?
                const rename = global_state.cul_functions.has(
                  `${opts.cul_scope_id}_${d.local.name}`
                ); // this is false despite revenue now being an implicit import from EP
                if (rename) d.local.name += '_'; // only update the local name, imported name is altered if necessary by the logic where rename happens in Function
                global_state.cul_functions.set(`${opts.cul_scope_id}_${d.local.name}`, {
                  cul_scope_id: opts.cul_scope_id,
                  name: d.local.name,
                  imported: d.imported.name,
                  cul_source_scope_id: global_state.cul_scope_id_counter,
                  reason: `explicit import${rename ? ' (renamed)' : ''}`, // todo make distinction about local/imported renames?
                });
                // and create link
                global_state.cul_links.add({
                  to: `${opts.cul_scope_id}_${d.local.name}`,
                  from: `${global_state.cul_scope_id_counter}_${d.imported.name}`, // ? fails on import addMonths from 'date-fns/esm/addMonths' ?
                  reason: 'explicit import', // todo " (renamed)"? prob not necessary as implied by modifiers in to/from
                });
              });


              // MAINTAIN NEXT LIST

              /*let e = path.node.source.value
              console.log(e)
              console.log(e.includes('.cul.js'))
              if (e.includes('.cul.js'))
                introspection_(e, fs)*/
            },


            CallExpression(path) {
              // not using Functions or cul_functions, I guess because of sequencing?
              // there can be e.g.   return keys_stream_function()().filter((d) => d.frame == f());
              // I need ()() last call to return

              if (path.node.arguments?.length == 0 && path.node.callee.name == undefined) return;


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
                loc: path.node.loc
              });
            },
          }
        })
        ]]
    });

    //[...global_state.cul_scope_ids_to_resource].filter(d => d[0] > opts.cul_scope_id).forEach(d => {
    next.forEach(async cul_scope_id => {
      let u = global_state.cul_scope_ids_to_resource.get(cul_scope_id).split('?'); // i guess only one of these
      let s = new URLSearchParams(u[1])
      await introspection_(u[0], fs, { cul_scope_id: +s.get('cul_scope_id'), cul_parent_scope_id: +s.get('cul_parent_scope_id') })
    })
  }

  await introspection_(entrypoint, fs, { cul_scope_id: 0, cul_parent_scope_id: -1 });


  let introspection = global_state

  // TODO graph processing here

  var g = new G.Graph({ multigraph: true });
  var g1 = new G.Graph({ multigraph: true });

  // create nodes: node for each cul_definition
  introspection.cul_functions.forEach((value, key) => {
    g.setNode(key, { ...value, label: `${key}` });
    g1.setNode(key, { ...value, label: `${key}` });
  });

  // set edges
  introspection.cul_links.forEach((value) => {
    if (!introspection.cul_functions.has(value.from)) return; // Array.push({}) has in cul_links as 0_undefined
    g.setEdge(value.from, value.to, {
      value,
      label:
        value.reason +
        (value.negs ? " -" + value.negs.toString() : "") +
        (value.reason == "input"
          ? " +" + introspection.cul_functions.get(value.from).name
          : "")
    });
    g1.setEdge(value.to, value.from, {
      value,
      label:
        value.reason +
        (value.negs ? " -" + value.negs.toString() : "") +
        (value.reason == "input"
          ? " +" + introspection.cul_functions.get(value.from).name
          : "")
    });
  });

  /*alg.postorder(g1, g.nodes()); // this ordering (on g1) ensures all inputs ordered before each node (all nodes included)
      alg.postorder(g1, g.nodes()).map((d) => ({
        d,
        ss: g1.successors(d).toString(),
      }));*/

  [...introspection.cul_functions.entries()]
    //.filter(([k, d]) => d.reason != 'input definition')
    .forEach(([k, d]) => {
      if (k.slice(-3) == '_in') return;
      var a = alg;
      introspection.cul_input_map.set(k,
        new Set(
          alg
            .postorder(g1, k)
            .filter((d) => g.node(d)?.reason == "input definition") // non JS has no reason e.g. reporting Table, but get excluded. Could lookup cul_functions)
            .map((d) => g.node(d).name)
        ))
        ;
    });

  // e.g. price_my_fave_product = () => price({product_in:'mate'}), while another call to price might indicate a dependence on product, this particular call doesn't, and *without any other calls* then price_my_fave_product should not be dependent on product
  // I call this a 'neg' in terms of the call. Logic below figures about dependence impacts via graph logic
  // cul_input_map updated directly below
  var edges_with_negs = g
    .edges()
    .map((d) => g.edge(d))
    .filter((d) => d.value.negs?.length > 0);

  edges_with_negs.forEach((edge) => {
    edge.value.negs.forEach((neg_in) => {
      var other_edges = g
        .inEdges(edge.value.to)
        .map((d) => g.edge(d))
        .filter((d) => JSON.stringify(d) != JSON.stringify(edge)); // filter out edge
      // can this forEach() be an every() with a break when a neg is needed? Also s.t. better than stringify?
      alg.preorder(g, edge.value.to).forEach((d) => {
        other_edges = g
          .inEdges(d)
          .map((d) => g.edge(d))
          .filter((d) => JSON.stringify(d) != JSON.stringify(edge))
          .filter((d) => !d.value.negs?.includes(neg_in));

        //(gg.inEdges(d).map(d => g.edge(d))

        //if (gg.inEdges(d).filter(d => g.edge(d).value.reason == 'call').map(d => g.edge(d).value.negs).reduce((a,v) => ([...a,...v]), []).includes(neg_in))
        // does another path include the neg_in?

        var result = g
          .successors(d)
          .filter((d) => d != edge.value.from /* filter out the negged one */)
          .map((d) => introspection.cul_input_map.get(d))
          .reduce((a, v) => [...a, ...v], [])
          .includes(neg_in);

        result = other_edges
          .map((d) => introspection.cul_input_map.get(d.value.from) ?? new Set([d.value.from]) /* because I removed inputs from cul_input_map, maybe confirm reason=='input'? */ )
          .reduce((a, v) => [...a, ...v], [])
          .includes(neg_in);

        if (!result) introspection.cul_input_map.get(d).delete(neg_in);
      });
    });
  });

  // based on cul_input_map, add inputs into cul_functions)
  [...introspection.cul_functions.entries()].map(([k, v]) => [
    k,
    {
      ...v,
      inputs: introspection.cul_input_map.get(k)
        ? [...introspection.cul_input_map.get(k)]
        : []
    }
  ]);

  return introspection;


  return global_state;

}


// for now only entrypoint compiled
export const compile_new = (entrypoint, fs, introspection) => {

  const compile_new_ = (entrypoint, fs, introspection, cul_scope_id) => {

    
    //let code = ((fs) && fs[entrypoint]) ? fs[entrypoint] : await (await fetch(entrypoint)).text();

    return Babel.transform(fs[introspection.cul_scope_ids_to_resource.get(cul_scope_id).split('?')[0]], {
      //presets: ["es2015", "react"],
      generatorOpts: { compact: false, concise: false, retainLines: true },
      sourceMaps: true,
      plugins: [
        [
          ({ types: t }) => ({
            name: 'calculang-js-transform-loader-visitor',
            visitor: {
              Program(path, state) {
                let implicit_imports = [...introspection.cul_functions.values()].filter(
                  (d) =>
                    d.cul_scope_id == state.opts.params.cul_scope_id &&
                    d.reason == 'implicit import'
                );

                // copied from initial visitor
                implicit_imports.forEach((d) => {
                  path.unshiftContainer(
                    'body',
                    t.importDeclaration(
                      [t.importSpecifier(t.identifier(d.name), t.identifier(d.name))],
                      t.stringLiteral(
                        introspection.cul_scope_ids_to_resource.get(d.cul_source_scope_id) // BUG here because the path should not always be the same, will be issue in non-trivial directory structures
                      )
                    )
                  );
                  path.node.body[0].cul_implicit_import = true; // not sure if this is a supported trick! but it works. modifying leading/trailingCommments is an alt
                });
              },

              Function(path, state) {
                let name = path.parent.id?.name;

                var def_ = introspection.cul_functions.get(
                  `${state.opts.params.cul_scope_id}_${name}_`
                );

                if (def_ && def_.reason == 'definition (renamed)') {
                  name += '_';
                  path.parent.id.name += '_';
                }

                if (path.node.params.length != 0) return; // memoization case export const y = (a) => {   dont replace a with {}

                const ins = [
                  ...(introspection.cul_input_map.get(
                    `${state.opts.params.cul_scope_id}_${name}`
                  )),
                ];

                path.node.params = [
                  t.objectPattern(
                    ins.map((d) =>
                      t.objectProperty(t.identifier(d), t.identifier(d), false, true)
                    )
                  ),
                ];
              },

              ExportSpecifier(path, { opts, ...state }) {
                //debugger;
                var renamed = introspection.cul_functions.has(
                  `${opts.params.cul_scope_id}_${path.node.local.name}_` // isn't this limited?
                );
                if (renamed) {
                  path.node.local.name += '_';
                  path.node.exported.name += '_';
                }
              },
              ImportSpecifier(path, { opts, ...state }) {
                if (path.parent.cul_implicit_import) return; // don't do this for implicits

                var renamed = introspection.cul_functions.get(
                  `${opts.params.cul_scope_id}_${path.node.local.name}_` // isn't this limited? Affd rec?
                );
                if (renamed) path.node.local.name += '_' // better or regressions?
                // below comment totally incorrect - remove ???
                //if (renamed) path.node.local.name += '_$'; // an _ reference should never be used. I could delete, but I do this instead. $ mitigates eslint fails in esm.

                path.node.imported.name =
                  introspection.cul_functions.get(
                    `${opts.params.cul_scope_id}_${path.node.local.name}` // isn't this limited? Affd rec?
                  )?.imported || path.node.imported.name; // isEqual etc.
              },
              ImportDeclaration(path, { opts, ...state }) {
                /* if (
                  [...opts.cul_scope_ids_to_resource.values()].indexOf(
                    `${path.node.source.value}`
                  ) > -1
                )*/
                if (path.node.cul_implicit_import) return; // ignore implicits, new logic

                //debugger;
                if (
                  !introspection.cul_functions.has(
                    `${opts.params.cul_scope_id}_${path.node.specifiers[0].local.name}`
                  )
                )
                  return; // ignore non-calculang functions

                // set the source based on calculang scoping etc logic
                path.node.source.value = introspection.import_sources_to_resource.get(
                  `${opts.params.cul_scope_id}_${path.node.source.value}`
                );
              },

              // do I need to exclude != ({obj}) ?
              // no?
              // mainly ensure I tolerate () or ({}) and combine with ({x_in: }) correctly

              CallExpression(path, state) {
                if (
                  !introspection.cul_input_map.has(
                    // I really should use cul_functions and look for cul_scope_id?
                    `${state.opts.params.cul_scope_id}_${path.node.callee.name}`
                  )
                )
                  return; // ignore non-cul calls

                const ins = [
                  ...introspection.cul_input_map.get(
                    `${state.opts.params.cul_scope_id}_${path.node.callee.name}`
                  ),
                ]; // a lot of assumptions here
                //if (path.node.arguments?[0] == undefined)

                const defined_args = (
                  path.node.arguments[0] ? path.node.arguments[0].properties : []
                ).map((d) => d.key.name);
                path.node.arguments = [
                  //...new Set([
                  // fix bug here where t_in included twice (bounce)
                  t.objectExpression([
                    ...ins
                      .map((d) =>
                        t.objectProperty(t.identifier(d), t.identifier(d), false, true)
                      )
                      .filter((d) => !defined_args.includes(d.key.name)),
                    ...(path.node.arguments[0] ? path.node.arguments[0].properties : []), // todo check robustness of this merge with existing properties
                  ]),
                  //]),
                ];
              },
              //},
            }
          }), { params: { cul_scope_id } }
        ]]
    })
  }

  // LAST STEP? replace imports with blobs?

  return ([...Array(introspection.cul_scope_ids_to_resource.size)].map((d, i) =>
    compile_new_(entrypoint, fs, introspection, i)))


}

// TODO bring in fns_fromDefinition


export const calls_fromDefinition = (introspection) => ([...introspection.cul_links].filter((d) => d.reason == "call" /* && !d.from.includes("undefined") ORDER GTEES NEEDED*/)
  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.from).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.from)[0].from
      :
      d.from
  }))
  // THE REST LOOKUP ON fromDefinition AND ARE COPIED; ABOVE IS DIFFERENT !
  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.fromDefinition).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.fromDefinition)[0].from
      :
      d.fromDefinition
  }))

  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.fromDefinition).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.fromDefinition)[0].from
      :
      d.fromDefinition
  }))
  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.fromDefinition).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.fromDefinition)[0].from
      :
      d.fromDefinition
  }))

  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.fromDefinition).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.fromDefinition)[0].from
      :
      d.fromDefinition
  }))

  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.fromDefinition).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.fromDefinition)[0].from
      :
      d.fromDefinition
  }))

  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.fromDefinition).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.fromDefinition)[0].from
      :
      d.fromDefinition
  }))

  .map((d) => ({
    ...d,
    fromDefinition: introspection.cul_functions.get(d.fromDefinition).reason.includes(
      "import"
    )
      ?
      [...introspection.cul_links].filter((e) => e.to == d.fromDefinition)[0].from
      :
      d.fromDefinition
  }))

  .map(d => ({ ...d, cul_scope_id: d.to.split('_')[0] /* TODO add this in introspection cul_links? */ }))
)

// todo consider converting import specifiers into data uris instead of removing and concating
// sourcemaps will break: need to merge 2x maps due to replacements
export const bundleIntoOne = (compiled, introspection, memoize) => {

  // memoize code
  const inputs = [...introspection.cul_functions.values()].filter(d => d.reason == 'input definition').map(d => d.name).sort()
  const formulae_not_inputs = [...introspection.cul_functions.values()].filter(d => d != "memo_hash" && d.reason == 'definition' && inputs.indexOf(d.name + '_in') == -1 && d.name.indexOf('function') == -1).map(d => d.name)
  const has_memo_hash = introspection.cul_functions.has("0_memo_hash") // all_cul will create issue here?

  const compiled2 = []
  const blobs = {}

  const calls = calls_fromDefinition(introspection)


  compiled.map((d, i) => ({ ...d, cul_scope_id: i }))/*.reverse()*/.forEach(input => {

    // put cul_
    const calls_scoped = calls.filter(d => d.cul_scope_id == input.cul_scope_id)
    let call_count = 0

    compiled2.push(Babel.transform(input.code, {
      //presets: ["es2015", "react"],
      generatorOpts: { /*compact: true*/ retainLines: true },
      sourceMaps: false,
      plugins: [
        [
          ({ types: t }) => ({
            name: 'calculang-js-transform-loader-visitor-to-monolith-esm',
            visitor: {
              /*ImportDeclaration(path) {
                [...introspection.cul_scope_ids_to_resource.entries()].filter(d => d[1] == path.node.source.value).forEach(d => {
                  path.node.source.value = `./cul_scope_${d[0]}.mjs`
                })
              },*/
              ImportDeclaration(path) {
                if (!path.node.source.value.includes('.cul')) return;
                path.remove();
                //debugger;//

                // old ESM visitor to replace to cul_scope_id refs
                /*[...introspection.cul_scope_ids_to_resource.entries()].filter(d => d[1] == path.node.source.value).forEach(d => {
                  path.node.source.value = `./cul_scope_${d[0]}.mjs`
                })*/
              },
              ExportDeclaration(path) {
                if (path.node.specifiers.length)
                  path.remove();
              },
              CallExpression(path) { // TODO audit after old code, if I am properly conditioning on calculang logic

                if (
                  !introspection.cul_input_map.has(
                    // I really should use cul_functions and look for cul_scope_id?
                    `${input.cul_scope_id}_${path.node.callee.name}`
                  )
                )
                  return; // ignore non-cul calls

                //debugger
                // limit this to calculang calls !!
                path.node.callee.name = 's' + calls_scoped[call_count++].fromDefinition
                //compiled2.push(path)
              },
              Function(path) {
                // use input.cul_scope_id

                let name = path.parent?.id?.name;

                if (name == undefined) return;

                //if (name == 'memo_hash') return;

                if (introspection.cul_functions.has(input.cul_scope_id + '_' + name))
                  path.parent.id.name = 's' + input.cul_scope_id + '_' + name + ((memoize && formulae_not_inputs.includes(path.parent.id.name)) ? '$' : '')
              }


            },

          })
        ]]
    }))
  })

  const out = compiled2.reduce((a, v, i) => a + "\n////////////// cul scope id " + i + " //////////\n\n" + v.code + "\n\n\n", "") 



// only when memoize on and not an input HACKY?
  + (memoize ? ([...introspection.cul_functions.values()].filter(d => (d.reason == 'definition' || d.reason == 'definition (renamed)') && formulae_not_inputs.includes(d.name)).map(d => {
    const y = `({${[...introspection.cul_input_map.get(d.cul_scope_id+'_'+d.name)].join(', ')}})`;
    //return `export const s${d.cul_scope_id}_${d.name}$m = memoize(s${d.cul_scope_id}_${d.name}$, ${has_memo_hash ? `s0_memo_hash$("${d.name}")` : "JSON.stringify"});
//export const s${d.cul_scope_id}_${d.name} = ${y} => s${d.cul_scope_id}_${d.name}$m${y}`;
//return `export const s${d.cul_scope_id}_${d.name}$m = memoize(s${d.cul_scope_id}_${d.name}$, ${has_memo_hash ? `s0_memo_hash$("${d.name}")` : `${y} => Object.values(${y}).join(',')`});
return `export const s${d.cul_scope_id}_${d.name}$m = memoize(s${d.cul_scope_id}_${d.name}$, ${has_memo_hash ? `s0_memo_hash$("${d.name}")` : `${y} => Object.values(${y}).toString()`}); // DN moved memo_hash to be formulaname => hash function
export const s${d.cul_scope_id}_${d.name} = ${y} => s${d.cul_scope_id}_${d.name}$m${y}`;
  }).join('\n\n')) + `
  // from https://cdn.jsdelivr.net/npm/underscore@1.13.6/underscore-esm.js

  // Memoize an expensive function by storing its results.
  function memoize(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = (hasher ? hasher.apply(this, arguments) : key); // DN removed forced string coersion, undo?
      if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }

  // Internal function to check whether \`key\` is an own property name of \`obj\`.
function has$1(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
}


` : '')

  // is this approach better than fromDefinition type change ???? how reliable cul_source_scope_id for explicit imports?

  // ORDER IS IMPORTANT
  + [...introspection.cul_functions.values()].sort((a,b) => b.cul_scope_id-a.cul_scope_id).filter(d => d.cul_scope_id != 0 && (d.reason == 'explicit import' || d.reason == 'explicit import (renamed)')).map(d => `export const s${d.cul_scope_id}_${d.name} = s${d.cul_source_scope_id}_${d.imported}`).join(";\n") + '\n\n\n'

  + [...introspection.cul_functions.values()].filter(d => d.cul_scope_id == 0 && (d.reason == 'explicit import' || d.reason == 'explicit import (renamed)')).map(d => `export const ${d.name} = s${d.cul_source_scope_id}_${d.imported}`).join(";\n") + '\n\n\n'


+ "\n\n\n\n////////// defaults: ////\n\n"
    + [...introspection.cul_functions.values()].filter(d => d.cul_scope_id == 0 && d.reason == 'definition').map(d => `export const ${d.name} = s0_${d.name}`).join(";\n") + '\n\n\n'

    


  return out;

}

// alternative import patterns?
// see e.g. doimport https://observablehq.com/@kreijstal/import-global-as-esm

// fs are the only contents the compiler can read
// remote URLs won't be fetched (yet)
// instead: fetch them in code that calls compile
export const compile = async ({entrypoint, fs, memo = true}) => {
  // NOTE: although not tidy, introspection, compile_new etc. is exported
  // TODO tidy up those APIs
  const introspection_a = await introspection(entrypoint, fs);
  const compiled = await compile_new(entrypoint, fs, introspection_a);
  const bundle = bundleIntoOne(compiled, introspection_a, memo);
  
  //const u = URL.createObjectURL(new Blob([bundle], { type: "text/javascript" }))
  //console.log(`creating ${u}`)
  const data_uri_prefix =         "data:" + "text/javascript" + ";base64,";
  const u = data_uri_prefix + btoa(bundle)//(node) Buffer.from(bundle).toString('base64')
  // https://developer.mozilla.org/en-US/docs/Glossary/Base64#javascript_support
  // Read Note and The "Unicode Problem" - TOFIX

  const model = await import(u)
  
  return {
    introspection: introspection_a,
    compilations: compiled, // Babel output for each scope transform (including sourcemap: used e.g. for reactive workings navigation)
    js: model, // poss. change to model
    bundle // poss. change to code?
  }
}
