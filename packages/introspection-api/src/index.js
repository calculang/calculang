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

// INTROSPECTION PROCESS - HIGH LEVEL OVERVIEW

/* compiler.js runs a webpack process which effectively does a dummy bundle process starting at entrypoint.
   In this process calculang files are configured to run through a babel visitor function.
   calculang code isn't specifically altered here except for whats necessary to facilitate calculang scoping logic (note below). (+rename logic but can this be removed?)
   The purpose of the visitor function is to collect information on calculang functions, calls between functions, and inputs.
   This data is saved in global_state, so that it can be accessed in compiler.js after the webpack call completes (i.e. the entire tree of calculang has been visited).
   Graph logic in compiler.js then uses this information to determine inputs for each calculang function, and puts/updates results in global_state.
   global_state is then read below, after the compiler call. It must also be reset after use, to support follow-up calls to the introspection api (used for testing).
*/

//////////////////////////////////////////////////////////

// SOME DESIGN PROPERTIES SCRIBBLES

// INPUT INFERENCE
/*
  In calculang function inputs shouldn't be specified in function code: they are inferred at compilation (introspection to be more specific).
  So you always do 'export const fn_we_want = () => ...' - nothing specified between those brackets, for a calculang function.

  With regards to calls, arguments (or is it parameters?) are also derived at compilation on the basis of inferred inputs and the call itself.

  The call itself, in calculang code, should not include inputs unless it is to encode a desired modelling relationship, e.g. 'sales_target_now = () => sales_target({year_in:2021})'
  If we think sales_target also depends on an optimism input, we do nothing. We want to write general code and calculang will take care of the specific wiring, because it may differ from problem to problem.
 */

// INHERITENCE OF PARENT FUNCTIONS IN CALCULANG, OVERWRITING FUNCTIONS, AND _ MODIFIER

/* calculang gives precedence for a given function call to functions defined closer to the entrypoint,
   rather than closer to the call. This lets "parent" modules 'override' the functionality in "child" modules, which supports recycling of very general models, a key design concern.

   Further, the override functionality can be defined in terms of the child function using an '_' modifier. An example of this is below where the price in a model is overridden with an inflated price, note the '_' included in import. 

   import { price_ } from './base.cul';
   export const price = () => (price_() * 1.1)

   A 'merge' switch to control this inheritance e.g. by './base.cul?-merge' , is being considered ( use cases > namespaced imports? )
 */

// CALCULANG SCOPING LOGIC

/* calculang is designed to be scalable, so it is modular and one calculang entrypoint may import from many different calculang files, which may import from other calculang files and so on.
   Further, the same calculang file may require different transformation depending on via what path it is imported!

        e.g. this happens if [base] feeds in to [proposed] which updates some function in [base] to behave differently (e.g. introduce inflation => time-dependence), and both [base] and [proposed] feed into [proposed impact], the entrypoint for a particular compilation.
        Here, the [proposed impact] results have a time dependence (unless constrained),
        and although [proposed] functions come from the same sourcecode in [base], they should be transformed differently: in one instance ([proposed] <- [base] path) delicately passing the time input through the Javascript arguments/parameters, and [base] path instance without any time notion whatsoever. Same sourcecode, different output: even within the same compilation.

  To support this modularity, every file processed by calculang gets a cul_scope_id (The cul_scope_id is also an important consideration for inheritance of parent functions).
  The entrypoint gets assigned a cul_scope_id of 0, and the visitor includes logic while processing each file to assign an increasing cul_scope_id into the resource parameters of each ImportDeclaration (i.e. import X from 'Y.cul.js', 'Y.cul.js' is replaced with 'Y.cul.js?cul_scope_id=zzz').

  This is one of the few piece of common logic in introspection-api loader/visitor and calculang-js loader/visitor.

*/

//////////////////////////////////////////////////////////

// TODO items:

/* We should probably replace global_state with a different method to share information between visitor and compiler. And it should definitely be removed below either way!

  also 'compiler' is a little misleading in this step since the purpose of this compiler pass is just to collect information to be used by the actual compiler in @calculang/calculang-js ! */

import compiler from './compiler.js';
import global_state from './global_state.js';

var global_state_stack = [];
var global_state_before = {};

export default async (entrypoint, options = {}) => {
  global_state_stack.push(global_state);

  global_state_before.cul_functions = global_state.cul_functions;
  global_state_before.cul_links = global_state.cul_links;
  global_state_before.cul_scope_id_counter = global_state.cul_scope_id_counter;
  global_state_before.cul_parent_scope_id = global_state.cul_parent_scope_id;
  global_state_before.cul_scope_ids_to_resource =
    global_state.cul_scope_ids_to_resource;
  global_state_before.import_sources_to_resource =
    global_state.import_sources_to_resource;
  global_state_before.cul_input_map = global_state.cul_input_map;
  global_state_before.dot = global_state.dot;

  global_state.cul_functions = new Map();
  global_state.cul_links = new Set();
  global_state.cul_scope_id_counter = 0;
  global_state.cul_parent_scope_id = 0;
  global_state.cul_scope_ids_to_resource = new Map();
  global_state.import_sources_to_resource = new Map();
  global_state.cul_input_map = new Map();
  global_state.dot = '';

  await compiler(entrypoint, options);

  const output = { ...global_state };

  const new_global_state = global_state_before; //global_state_stack.pop();

  global_state.cul_functions = new_global_state.cul_functions;
  global_state.cul_links = new_global_state.cul_links;
  global_state.cul_scope_id_counter = new_global_state.cul_scope_id_counter;
  global_state.cul_parent_scope_id = new_global_state.cul_parent_scope_id;
  global_state.cul_scope_ids_to_resource =
    new_global_state.cul_scope_ids_to_resource;
  global_state.import_sources_to_resource =
    new_global_state.import_sources_to_resource;
  global_state.cul_input_map = new_global_state.cul_input_map;
  global_state.dot = new_global_state.dot;

  // reset global_state
  /*global_state.cul_functions = new Map();
  global_state.cul_links = new Set();
  global_state.cul_scope_id_counter = 0;
  global_state.cul_parent_scope_id = 0;
  global_state.cul_scope_ids_to_resource = new Map();
  global_state.import_sources_to_resource = new Map();
  global_state.cul_input_map = new Map();
  global_state.dot = '';*/

  return output; // or/fut: reconstruct an object
};
