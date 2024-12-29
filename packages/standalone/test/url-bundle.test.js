import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pre_fetch } from '@calculang/calculang-js/bin/pre_fetch.node.mjs' // TODO test standalone pre_fetch also

import { pre_fetch as pre_fetch_web } from '../pre_fetch.mjs' // TODO test standalone pre_fetch also

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



  /*it('import-url-dta-TA', async () => {
    await expect((await compile({
      entrypoint: './test/cul/import-url-dta-TA.cul.js',
      fs: await pre_fetch_web({'./test/cul/import-url-dta-TA.cul.js': }), // I'd need to do a readFile here to properly test. Issue definitely in pre_fetch with object provided: more tests for this? e.g. pre_fetch_bundle.test.js
      memo: false
    })).bundle).toMatchFileSnapshot('./bundles/import-url-dta-TA.bundle.js');
  })*/

})