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

// this visitor takes output of the calculang transform and makes Import Source replacements.
// the result is ESM and is emitted into an esm folder.
// normal calculang transform output continues through webpack process to produce the UMD bundle.

export default ({ types: t }) => ({
  name: 'calculang-js-transform-loader-visitor-to-esm',
  visitor: {
    ImportDeclaration(path, { opts, ...state }) {
      [...opts.cul_scope_ids_to_resource.entries()].filter(d => d[1] == path.node.source.value).forEach(d => {
        path.node.source.value = `./cul_scope_${d[0]}.js`
      })
    },
  },
});
