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

// OLD COMMENTS
// can this be general enough to write es modules?
// yes, if run with a scope tree. How would I set this up to be run with a simple babel command?
// use api instead, or copy source files first (acc. scope)
// mandatory: Es work needs to share this code, so just march on
// think RE how cache will work in ES

/*

OLD 'todo' file: 

visitor (rewriter visitor) logic::
::::::::::::::::::::::::::::::::::
visitor gets state.opts.cul_scope_id parent id not needed

Program:
filter cul_functions for cul_scope_id & 'implicit import': ADD IMPORTS    | soon, graph not needed. done?

ImportDeclaration:
implicit import (only need to check specifier[0]) => return
remap source (explicit import)                                              | soon, graph not needed. ES=just change map
                                                                            | needed now. done?

Function:
rename allowance                                                            | soon, graph not needed (done?)
pad fn definition                                                           | NOW done

CallExpression:
doesn't match ({ obj }) => return                                           | NOW done
pad by looking up callee(?) in input map.Don't need parentfn logic          | NOW done

*/

// memo loader/alpha5 introducing Import/ExportSpecifier... necessary?
// also ImportDeclaration changes

export default ({ types: t }) => ({
  name: 'calculang-js-transform-loader-visitor',
  visitor: {
    //Program:
    //filter cul_functions for cul_scope_id & 'implicit import': ADD IMPORTS
    Program(path, state) {
      let implicit_imports = [...state.opts.cul_functions.values()].filter(
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
              state.opts.cul_scope_ids_to_resource.get(d.cul_source_scope_id) // BUG here because the path should not always be the same, will be issue in non-trivial directory structures
            )
          )
        );
        path.node.body[0].cul_implicit_import = true; // not sure if this is a supported trick! but it works. modifying leading/trailingCommments is an alt
      });
    },

    Function(path, state) {
      let name = path.parent.id?.name;

      var def_ = state.opts.cul_functions.get(
        `${state.opts.params.cul_scope_id}_${name}_`
      );

      if (def_ && def_.reason == 'definition (renamed)') {
        name += '_';
        path.parent.id.name += '_';
      }

      if (path.node.params.length != 0) return; // memoization case export const y = (a) => {   dont replace a with {}

      const ins = [
        ...state.opts.cul_input_map.get(
          `${state.opts.params.cul_scope_id}_${name}`
        ),
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
      var renamed = opts.cul_functions.has(
        `${opts.params.cul_scope_id}_${path.node.local.name}_` // isn't this limited?
      );
      if (renamed) {
        path.node.local.name += '_';
        path.node.exported.name += '_';
      }
    },
    ImportSpecifier(path, { opts, ...state }) {
      if (path.parent.cul_implicit_import) return; // don't do this for implicits

      var renamed = opts.cul_functions.get(
        `${opts.params.cul_scope_id}_${path.node.local.name}_` // isn't this limited? Affd rec?
      );
      if (renamed) path.node.local.name += '_$'; // an _ reference should never be used. I could delete, but I do this instead. $ mitigates eslint fails in esm.

      // dn Nov 2023 #117
      //path.node.imported.name =
      //  opts.cul_functions.get(
      //    `${opts.params.cul_scope_id}_${path.node.local.name}` // isn't this limited? Affd rec?
      //  )?.imported || path.node.imported.name; // isEqual etc.
    },
    ImportDeclaration(path, { opts, ...state }) {
      /* if (
        [...opts.cul_scope_ids_to_resource.values()].indexOf(
          `${path.node.source.value}`
        ) > -1
      )*/
      if (path.node.cul_implicit_import) return; // ignore implicits, new logic

      if (
        !opts.cul_functions.has(
          `${opts.params.cul_scope_id}_${path.node.specifiers[0].local.name}`
        )
      )
        return; // ignore non-calculang functions

      // set the source based on calculang scoping etc logic
      path.node.source.value = opts.import_sources_to_resource.get(
        `${opts.params.cul_scope_id}_${path.node.source.value}`
      );
    },

    // do I need to exclude != ({obj}) ?
    // no?
    // mainly ensure I tolerate () or ({}) and combine with ({x_in: }) correctly

    CallExpression(path, state) {
      if (
        !state.opts.cul_input_map.has(
          // I really should use cul_functions and look for cul_scope_id?
          `${state.opts.params.cul_scope_id}_${path.node.callee.name}`
        )
      )
        return; // ignore non-cul calls

      const ins = [
        ...state.opts.cul_input_map.get(
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
  },
});
