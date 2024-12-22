import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pre_fetch } from '../../calculang-js/bin/pre_fetch.mjs'

const cwd = import.meta.dirname;

describe('local fetch', async () => {

  it('a', async () => {
    await expect(JSON.stringify(
      await pre_fetch('a.cul.js')
      , null, 2)).toMatchFileSnapshot('./local/a');
  })

  it('aa', async () => {
    await expect(JSON.stringify(
      await pre_fetch('aa.cul.js')
    , null, 2)).toMatchFileSnapshot('./local/aa');
  })

  // I need to use nodejs api, developing index2.js in calculang-js

  /*it('compile savings from LOCAL url should match expected', async () => {
    const m = await compile({
      entrypoint: `file://${fileURLToPath(new URL('./myfile.txt', import.meta.url))}`, //"./a.cul.js",
      memo: false
    });

    expect(m.bundle).toMatchFileSnapshot('file:./bundles/urlA.bundle.js');
  });*/
})