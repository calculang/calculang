import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';

import {compile} from '../index.js';

const cwd = import.meta.dirname;

// these look contrived, but mirror/are needed for modelling work I am doing
// Replacing very precise lists by all_cul leads to a greater need for these cases to work
// TOFIX traversal so that remaining test will work: for now fail is OK (but will confuse)

describe('bundle output', () => {
  it('inheritance chain that should work and pass', async () => {
    const m = await compile({
      entrypoint: 'zero.cul.js',
      fs: {
        'zero.cul.js': `import { other_thing } from 'one.cul.js';
                        export const thing = () => 110;`,
        'one.cul.js': `import { thing, other_thing } from 'two.cul.js';`,
        'two.cul.js': `export const thing = () => 100;
                       export const other_thing = () => 1;`,
      },
      memo: false
    });
    await expect(m.bundle).toMatchFileSnapshot('./bundles/many-chains-of-inheritance-A.bundle.js');
  });

  it('inheritance chain that should work and pass', async () => {
    const m = await compile({
      entrypoint: 'zero.cul.js',
      fs: {
        'zero.cul.js': `import { other_thing, thing_that_calls_thing } from 'one.cul.js';
                        export const thing = () => 110;`,
        'one.cul.js': `import { thing, other_thing } from 'two.cul.js';
                       export const thing_that_calls_thing = () => thing();`,
        'two.cul.js': `export const thing = () => 100;
                       export const other_thing = () => 1;`,
      },
      memo: false
    });
    await expect(m.bundle).toMatchFileSnapshot('./bundles/many-chains-of-inheritance-B.bundle.js');
  });

  // "ReferenceError: s1_thing_that_calls_thing is not defined": expected How to test? TOFIX
  /*it('inheritance chain that should not work and pass (until I traverse cul_links for import renames TOFIX)', async () => {
    const m = await compile({
      entrypoint: 'minusone.cul.js',
      fs: {
        'minusone.cul.js': `import { other_thing, thing_that_calls_thing } from 'one.cul.js';
                        export const thing = () => 110;`,
        'zero.cul.js': `import { thing, other_thing } from 'one.cul.js';
                               export const thing_that_calls_thing = () => thing();`,
        'one.cul.js': `import { other_thing } from 'two.cul.js'`,
        'two.cul.js': `export const thing = () => 100;
                       export const other_thing = () => 1;`,
      },
      memo: false
    });
    await expect(m.bundle).toMatchFileSnapshot('./bundles/many-chains-of-inheritance-C.bundle.js');
  });*/
})
