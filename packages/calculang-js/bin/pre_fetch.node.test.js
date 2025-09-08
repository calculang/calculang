import { expect, describe, it } from 'vitest';

import { pre_fetch } from './pre_fetch.node.mjs'

describe('local source files', async () => {

  it('a', async () => {
    await expect(JSON.stringify(
      await pre_fetch({ 'entrypoint.cul.js': `export const a = () => a_in;` })
      , null, 2)).toMatchFileSnapshot('./snapshots/a.snapshot');
  })

  it('b', async () => {
    await expect(JSON.stringify(
      await pre_fetch({ 'entrypoint.cul.js': `import { b } from 'b.cul.js'; export const a = () => a_in;`,
                        'b.cul.js': `export const b = () => "b";`
       })
      , null, 2)).toMatchFileSnapshot('./snapshots/b.snapshot');
  })

})