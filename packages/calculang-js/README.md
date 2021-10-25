# calculang-js

calculang-js is a Javascript implementation of [calculang](../../README.md).

## usage

calculang-js includes a compiler API which converts a calculang entrypoint into a Javascript bundle with sourcemap, and a `cul-js` CLI with `compile` and `introspect` commands (and others). For CLI usage examples see [calculang README](../../README.md).

calculang-js compiler API usage example:

```javascript
import compiler from '@calculang/calculang-js';
const output = await compiler(entrypoint, options);
```

## internals

calculang-js relies on [`@calculang/introspection-api`](../introspection-api) and webpack (Note: `@calculang/introspection-api` also relies on webpack (separately) for its own internal processing pass).

From compiler.js:

```javascript
// compiler is implemented as a call to webpack v4 (atm) api with a loader setup to transform source code (via babel with a custom loader: calculang-transform-loader).
// The output is a Javascript bundle and sourcemap created by webpack, according to configuration below.
// pre-processed calculang information is needed to complete the compile, this comes from the introspection api call below, where results are passed to calculang-transform-loader via options.
```
