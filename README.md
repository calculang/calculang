# calculang

calculang is a language for calculations.

## motivation

- **separation of concerns**: calculations separate from general/imperative programming, models independent from applications and modular, usable for their own right with general or problem-specific interaction interfaces, specialised tooling for developers/stakeholders, calculation modelling specialism
- **unity**: unity of related calculations across applications/systems, streamlining of calculations and processes, no number is an island
- **transparency**: number stakeholders have transparency expectations, deliver this in a streamlined, standard way
- **democratisation of numbers**: number stakeholders start with customers, audience, citizens. Bank accounts, loans, government spending, public health projections, public statistics, policy basis documents, journalism, education, ...

See also references under 'more motivation' below.

## compiler

`cul-js` CLI compiles calculang into Javascript and provides information about the resulting model (introspection).

## usage

**Note: Not released to npm => must use build instructures in [CONTRIBUTING](./CONTRIBUTING.md).**

Installation:

```shell
npm install --save-dev @calculang/calculang-js
```

Compilation:

```shell
cul-js compile entrypoint.cul.js --no-implicit-input-functions --no-memo --target=umd
```

This creates `entrypoint.js` (alongside entrypoint.cul.js). This is a UMD Javascript bundle, with sourcemap `entrypoint.js.map`.

Introspection:

```shell
cul-js introspect entrypoint.cul.js --no-implicit-input-functions --no-memo
```

Graph, using `dot` command from graphviz (install separately):

```shell
cul-js dot entrypoint.cul.js | dot -Tsvg > temp.svg
start temp.svg
```

Note: options to `cul-js` above are concerned with forward-compatability, they don't currently matter.

## status

Initial implementation scales better conceptually rather than practically, but should be useful for carefully bounded problems and a useful foundation/discussion project towards project motivations.

## design principles/features

**Modularity**:

A key design focus for calculang is scalability. To this end calculang models can be defined in modular fashion and recycled for varying usecases.

Models-of-models is a useful concept in considering model design. A design suggestion is to develop very general models and apply these in use- or application-specific models; in this way the models can support a wider range of usecases.

**Input inference**:

Inputs to function calls in calculang are inferred by the compiler, based on a graph of inputs and functions in the complete model being compiled.

This reduces code boilerplate, but more fundamentally it promotes recycling of models: we shouldn't code the wiring between functions manually because it will change from one usecase to the next.

**Inheritence of parent functions**:

In modular development, calculang gives precedence for a given function call to functions defined closer to the entrypoint or model root, rather than closer to the call.

This is how "parent" models can 'override' the functionality in "child" models, and supports recycling of very general models.

Further, the overriden functionality can be defined in terms of the child function (using an '_' modifier). e.g. to inflate the price in a model might involve `price = price_() * 1.1`.

**Javascript**:

In calculang-js implementation calculang models can interact with Javascript. You should keep Javascript-specific code in separate .js files/packages.

This interaction, done carefully, opens up many usecases. Not least, integration and co-ordination with (and of) other systems.

## roadmap

v0.1.0-alpha1+ : some mini releases to introduce developed/proposed features, tests, cleanup code

v0.1+.0 : more tests, examples, integrations, documentation, logo, community focus,  maybe REPL, website, blog, barebones browser extension, barebones VSCode extension, alt. bundler?, eventually show HN, review license/CLA/etc, CI/CD optimisation

Post: alt. implementations? e.g. Rust?

In parallel to the public roadmap, I will probably have a private/applications roadmap. Feel free to get in touch if you want me to consider your own modelling project/s and how they can fit into this roadmap.

## help wanted

Extension authors for browsers/VSCode. These can be independent projects. Similar Re integrations (incl. Excel).

Frontend developers for blog/websites and community model frontends.

Community models and web apps, vizualisations/explorables (calculang.party?).

All developers to get feedback/discuss/think re implementations or changes leading to better scalability.

## more motivation

I'm not the only person to consider the opportunity from making models more accessible. Bret Victor included points around this in a blog post about climate change.

[What can a technologist do about Climate Change (a personal view)](http://worrydream.com/ClimateChange) by Bret Victor, particularly relevant at [Media for Understanding Situations](http://worrydream.com/ClimateChange/#media).

Also good by Bret Victor, regarding interfaces to models: [Explorable Explanations](http://worrydream.com/#!/ExplorableExplanations).

Many ideas along different lines of interaction with models become clearer when we separate concerns in the way that a language for calculations proposes.

## contributing

[CONTRIBUTING.md](./CONTRIBUTING.md) contains brief development/contributing notes.

## license

Code in this repository is free software licensed under the [GNU Affero General Public License Version 3](LICENSE).

calculang is made with ❤️ and 🧉.
