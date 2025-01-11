import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';

import {compile} from '../index.js';

const cwd = import.meta.dirname;

// these look contrived, but mirror/are needed for modelling work I am doing
// Replacing very precise lists by all_cul leads to a greater need for these cases to work
// TOFIX traversal so that remaining test will work: for now fail is OK (but will confuse)

describe('overwrite recursive function THIS IS BAD OUTPUT', async () => {
  it('should work', async () => {
    const m = await compile({
      entrypoint: 'entrypoint.cul.js',
      fs: {
        'entrypoint.cul.js': `
                          import { thing_ as thing_single } from 'decay.cul.js';
                          export const thing = () => thing_single() * 2;`,
        'decay.cul.js': `
                          export const factor = () => 0.9;
                          export const t = () => t_in;
                          export const thing = () => {
                            if (t() <= 0) return 1;
                            else return thing({t_in:t()-1}) * factor();
                          }`
      },
      memo: false
    });
    await expect(m.bundle).toMatchFileSnapshot('./bundles/overwrite-recursive-function.bundle.js');
  });
})
