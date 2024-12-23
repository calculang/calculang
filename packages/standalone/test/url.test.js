import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pre_fetch } from '../../calculang-js/bin/pre_fetch.mjs'

const cwd = import.meta.dirname;

// TODO test remote URLs importing remote URLs

describe('remote fetch', async () => {

  it('import-url', async () => {
    await expect(JSON.stringify(
      await pre_fetch('./test/cul/import-url.cul.js')
      , null, 2).replaceAll(cwd,'$CWD')).toMatchFileSnapshot('./local/import-url');
  })

  it('import-url2', async () => {
    await expect(JSON.stringify(
      await pre_fetch('./test/cul/import-url2.cul.js')
      , null, 2).replaceAll(cwd,'$CWD')).toMatchFileSnapshot('./local/import-url2');
  })

  it('import-url3', async () => {
    await expect(JSON.stringify(
      await pre_fetch('./test/cul/import-url3.cul.js')
      , null, 2).replaceAll(cwd,'$CWD')).toMatchFileSnapshot('./local/import-url3');
  })

})