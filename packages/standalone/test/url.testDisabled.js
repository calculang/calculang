import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {compile} from '../index.js';

const cwd = import.meta.dirname;

describe('bundle output', () => {
  
  // I need to use nodejs api, developing index2.js in calculang-js

  /*it('compile savings from LOCAL url should match expected', async () => {
    const m = await compile({
      entrypoint: `file://${fileURLToPath(new URL('./myfile.txt', import.meta.url))}`, //"./a.cul.js",
      memo: false
    });

    expect(m.bundle).toMatchFileSnapshot('file:./bundles/urlA.bundle.js');
  });*/
})