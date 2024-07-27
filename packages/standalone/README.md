# @calculang/standalone

A standalone compiler for calculang: doesn't depend node or webpack, and can be imported directly into modern browsers.

Does have other dependencies: `@babel/standalone` and `@dagrejs/graphlib`. (todo pin dagre version, SHA hashes, or bundle these)

## Limitations

Using in Node results in this error:

```
Error [ERR_NETWORK_IMPORT_DISALLOWED]: import of 'blob:nodedata:75f5174d-2f62-4264-b5f1-9ac696aa3392' by https://cdn.jsdelivr.net/gh/declann/calculang-js-browser-dev@main/calculang.js is not supported: only relative and absolute specifiers are supported.
```

Considering moving import in compiler to data URL instead of to blob URLs.

## Future

Probably... This package will replace a lot of code `calculang-js`. Since it includes the `introspection-api`, that package will be deprecated and removed entirely (unless I decide to split this package similar to before).

Before these changes, they will live side-by-side.

## Usage

In modern browsers:

```js
import { compile } from "https://cdn.jsdelivr.net/gh/calculang/calculang@dev/packages/standalone/index.js"

const model = await compile({
  entrypoint: 'entry.cul.js',
  fs: {
    'entry.cul.js': `export const a = () => a_in;`,
  }
})
```

`model` is an object containing a Javascript module in `js` property, and introspection object in `introspection` properties.

Once published to npm, the import can use an NPM reference instead, and optionally be packaged locally:

```sh
npm i --save @calculang/standalone
```

then use:

```js
import { compile } from "@calculang/standalone"
```

NOTE: this still requires a modern browser and imports Javascript code from NPM/CDNs via URL.

## Examples

- [Metal](https://finding-calculang-foc.netlify.app/editor)

- [Posts on my blog](https://calcwithdec.dev/) (the recent ones)
