# calculang

calculang is a language for calculations.

## motivation: separation of concerns

calculang is domain-specific to calculations and it proposes a separation of concerns: **calculations separate from general programming**.

This makes it easier to reason about calculations, empowers specialised tooling, and enables **frictionless transparency and certainty** about calculations.

A language for calculations also generalises more readily than more rigid systems or tools, enabling **unity of calculations** and process (all ends).

A language can integrate freely with **established best-practice controls** and other tooling for languages.

## 🐣 early calculang highlights ⚡

- [some SaaS cashflows 💸](https://observablehq.com/@declann/some-cashflows?collection=@declann/calculang)
- [loan validator 🕵️ (dev 📓)](https://observablehq.com/@declann/loan-validator-dev?collection=@declann/calculang)
- [covid19: cases-deaths link (wip)](https://observablehq.com/@declann/covid19-cases-deaths-link?collection=@declann/calculang)
- more in [my ObservableHQ collection](https://observablehq.com/collection/@declann/calculang)

📫 for calculang updates, follow [@calculang](https://twitter.com/calculang) on Twitter.

## compiler

`cul-js` CLI compiles calculang into Javascript and provides information about the resulting model (introspection).

## usage

Installation:

```shell
npm install --save-dev @calculang/calculang-js
```

Compilation:

```shell
cul-js compile entrypoint.cul.js --no-implicit-input-functions --no-memo --target=umd
```

This creates `entrypoint.js` (alongside entrypoint.cul.js). This is a UMD Javascript bundle, with sourcemap `entrypoint.js.map`.

Change `--no-memo` to `--memo` to turn on memoization. Memoization typically **dramatically** helps execution of models - but is only designed for non-modular models now.

Introspection:

```shell
cul-js introspect entrypoint.cul.js --no-implicit-input-functions --no-memo
```

Graph, using `dot` command from graphviz (install separately):

```shell
cul-js dot entrypoint.cul.js | dot -Tsvg > temp.svg
start temp.svg
```

Note: `--no-*` options to `cul-js` above are concerned with forward-compatability, they don't currently matter.

## design principles/features

**Modularity**:

A key design focus for calculang is scalability. To this end calculang models can be defined in modular fashion and recycled for varying usecases.

Models-of-models is a useful concept in considering model design. A design suggestion is to develop very general models and apply these in use- or application-specific models; in this way the models can support a wider range of usecases.

**Input inference**:

Inputs to function calls in calculang are inferred by the compiler, based on a graph of inputs and functions in the complete model being compiled.

This reduces code boilerplate, but more fundamentally it promotes recycling of models: we shouldn't code the wiring between functions manually because it will differ from one usecase to the next.

**Inheritence of parent functions and overriding**:

In modular development, calculang gives precedence for a given function call to functions defined closer to the entrypoint or model root, rather than closer to the call.

In this way "parent" models can override the functionality of "child" models, and this supports recycling of very general models.

The overriden functionality can be defined in terms of the child function (using an interim '_' modifier), for example to inflate the price in a 'base' model might involve

```javascript
import { price_ as price_base } from './base.cul.js';

export const price = price_base() * 1.1;
```

**Javascript**:

In calculang-js implementation calculang models can interact with Javascript. You should keep Javascript-specific code in separate .js files/packages.

This interaction, done carefully, opens up many usecases. Not least, integration and co-ordination with (and of) other systems.

## status

Initial implementation scales better conceptually vs. practically, but is nonetheless useful for an array of simple applications and carefully bounded problems beyond that.

This is another way of saying: some technical creativity helps to get the most out of the existing implementation. Careful interation with Javascript leaves enormous scope open here!

## roadmap

v0.1.0-alpha1+ : some mini releases to introduce developed/proposed features, tests, cleanup code

v0.1+.0 : more tests, examples, integrations, documentation, logo, community focus,  maybe REPL, website, blog, barebones browser extension, barebones VSCode extension, alt. bundler?, eventually show HN, review license/CLA/etc, CI/CD optimisation

Post: alt. implementations? e.g. Rust?

## help wanted

Extension authors for browsers/VSCode. These can be independent projects. Similar Re integrations (incl. Excel).

Frontend developers for blog/websites and community model frontends.

Community models and web apps, vizualisations/explorables (calculang.party?).

All developers to get feedback/discuss/think re motivation and implementation/technical improvements.

## more motivation

calculang is motivated to make models: the workings of numbers, more accessible. Bret Victor included points around this in his blog post on [What can a technologist do about Climate Change (a personal view)](http://worrydream.com/ClimateChange), particularly relevant at [Media for Understanding Situations](http://worrydream.com/ClimateChange/#media).

Also good by Bret Victor, regarding interfaces to models: [Explorable Explanations](http://worrydream.com/#!/ExplorableExplanations).

Many ideas along different lines of interaction with models become clearer when we separate concerns in the way that a language for calculations proposes.

## contributing

[CONTRIBUTING.md](./CONTRIBUTING.md) contains brief development/contributing notes including build steps.

## license

Code in this repository is free software licensed under the [GNU Affero General Public License Version 3](LICENSE).

calculang is made with ❤️ and 🧉.
