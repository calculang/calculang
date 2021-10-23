# introspection api

Given an endpoint builds a relationship graph, and provides information on calculang scopes, functions and respective inputs.

## usage

```javascript
import introspection from '@calculang/introspection-api';
const output = await introspection(entrypoint, options);
```

## output object

The following Map objects are output:

- cul_functions, keyed by `<scope_id>_<name>`, values include information on scope and inputs
- cul_scope_ids_to_resource: `<scope_id>` mapped to resource reference
- import_sources_to_resource: keyed by `<scope_id>_<(original) source>`, values are replacement resource reference for an import source within the given scope i.e. including cul_scope_id and cul_parent_scope_id query parameters
- cul_functions_input_map: `<scope>_<name>` mapped to Set of inputs for each calculang function (shortcut to inputs lookup on cul_functions search)

cul_links, a Set of links in relationship graph, is also output, along with `dot` (RN).

cul_scope_id_counter and cul_parent_scope_id are for internal use.

More details on Map/Set objects in [global_state.js](./src/global_state.js)
