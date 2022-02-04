# Contributing

This page contains some information about developing for calculang internals 🔧

If you are keen to help the project in some other way or are unsure how, feel free to get in touch with me! 😃

## monorepo

calculang repository is a monorepo, using [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and [lerna](https://github.com/lerna/lerna) to manage multiple packages.

For an overview of all packages, see the [calculang `/packages` folder](/packages).

## build

1. clone `https://github.com/calculang/calculang`
2. run `yarn` to install required packages
3. `yarn run build` to build all packages
4. `yarn run bootstrap` to bootstrap packages (install dependencies and link cross-dependencies)
5. `yarn run test` to run the tests

## on licensing, for contributions/pull requests

Please see [inbound=outbound](https://docs.github.com/en/github/site-policy/github-terms-of-service#6-contributions-under-repository-license) clause of GitHub Terms of Service and [project license](./LICENSE.md) (AGPLv3).

Please talk to me if there are any doubts about the rights to your contribution, or about the project license.

## open issues

If you are willing to work on an open issue and confident, please comment in the issue.

## major changes

Please open a public discussion via a GitHub Issue first. Please include if you wish/are prepared to be assigned to the issue.

## continuous integration (CI)

Contributions should include new tests where relevant and be checked to pass. GitHub Actions will run tests on PRs (once approved).
