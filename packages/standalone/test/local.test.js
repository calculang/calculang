import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pre_fetch } from '../../calculang-js/bin/pre_fetch.mjs'

const cwd = import.meta.dirname;

describe('local fetch', () => {

  it('a', async () => {
    expect(
      await pre_fetch('a.cul.js')
    ).toMatchFileSnapshot('./local/a');
  })

  it('aa', async () => {
    const t = await pre_fetch('aa.cul.js')
    console.log('thing', t)
    expect(
      //JSON.stringify(
      //JSON.stringify(t)
      t
    //)
  ).toMatchFileSnapshot('./local/aa');
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