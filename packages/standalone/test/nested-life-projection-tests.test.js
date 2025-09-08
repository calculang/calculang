// tests based on repo @ https://github.com/calculang/nested-life-projections-example

import { expect, describe, it } from "vitest";

import { resolve } from "node:path";
import { readFile } from "node:fs/promises";

import { pre_fetch } from './pre_fetch.mjs'
import { compile } from '..';

const cwd = import.meta.dirname;

describe("some tests on nested life projection model", async () => {
  const fetched = await pre_fetch({
    "entrypoint.cul.js": `import {all_cul} from 'https://raw.githubusercontent.com/calculang/nested-life-projections-example/refs/heads/main/minimal/src/capital-requirements.cul.js';`,
  });

  const m = await compile({
    entrypoint: "capital-requirements.cul.js",
    fs: fetched,
    entrypoint: 'entrypoint.cul.js',
    memo: true,
  });

  it("bundle should match snapshot", async () => {
    await expect(m.bundle).toMatchFileSnapshot(
      "./snapshot/nested-life.bundle.js"
    );
  });
});
