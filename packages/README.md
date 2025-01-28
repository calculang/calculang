# calculang monorepo packages

## packages

1. [`@calculang/calculang-js`](./calculang-js): calculang transpiler to Javascript, provides `cul-js` CLI for compilation and introspection output
1. [`@calculang/standalone`](./standalone): standalone compiler for calculang: doesn't depend node or webpack, and can be imported directly into modern browsers.
1. [`@calculang/calculang-testcase-models`](./calculang-testcase-models): some calculang testcase models

## deleted

1. [`@calculang/introspection-api`](./introspection-api): API which takes an entrypoint and configuration, builds a relationship tree, and provides information on calculang scopes, functions and respective inputs
  - use [`@calculang/standalone`](./standalone) APIs instead