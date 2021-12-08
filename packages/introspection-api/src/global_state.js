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

// reflect updates in index.js also, where re-initialised

// using module cache for global state, bad form but does

export default {
  cul_functions: new Map(), // map of <cul_scope_id>_<name> -> {cul_scope_id, name, inputs (array), cul_source_scope_id, reason=definition|definition (renamed)|input definition|explicit import}
  cul_links: new Set(), // calls, imports, renames go here: Set of { to, from, reason=call|explicit import|implicit import }
  cul_scope_id_counter: 0,
  cul_parent_scope_id: 0,
  location: [],
  cul_scope_ids_to_resource: new Map(), // BUG this is used for inheritence logic ('implicit imports') & the same relative path is always used. It should depend on both the location of fn and where import goes, todo fix and dont want to trigger a circular compile ... fix later
  // alt. fix: always keep from parent? (old idea)
  import_sources_to_resource: new Map(),
  cul_input_map: new Map(), // map of <cul_scope_id>_<name> -> set of inputs
  dot: '', // graph of calculang model in dot notation
  global_state_before_map: new Map(),
  opts: new Map(), // TODO
};

////////////////////////////////////////
///// old thoughts:
// cul_functions AND cul_scope_table?
// why not just use cul_functions with a filter by scope? (only needed for merge?)
// => key=scopeid_name

// [{cul_scope_id, name, cul_source_scope_id}]
//
