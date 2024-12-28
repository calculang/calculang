import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pre_fetch } from '@calculang/calculang-js/bin/pre_fetch.node.mjs'
import {compile} from '../index.js';


const cwd = import.meta.dirname;

describe('remote fetch and bundle', async () => {

  it('import-url', async () => {
    await expect((await compile({
      entrypoint: './test/cul/import-url.cul.js',
      fs: await pre_fetch('./test/cul/import-url.cul.js'),
      memo: false
    })).bundle).toMatchFileSnapshot('./bundles/import-url.bundle.js');
  })

  it('import-url2', async () => {
    await expect((await compile({
      entrypoint: './test/cul/import-url2.cul.js',
      fs: await pre_fetch('./test/cul/import-url2.cul.js'),
      memo: false
    })).bundle).toMatchFileSnapshot('./bundles/import-url2.bundle.js');
  })

  it('import-url3', async () => {
    await expect((await compile({
      entrypoint: './test/cul/import-url3.cul.js',
      fs: await pre_fetch('./test/cul/import-url3.cul.js'),
      memo: false
    })).bundle).toMatchFileSnapshot('./bundles/import-url3.bundle.js');
  })
  // TODO add tests accross remote domains or directories (base url should be updating appropriately)

})