import { expect, describe, it } from 'vitest';

import {readFile} from 'node:fs/promises' // Relying on NodeJS APIs to read from local FS to load test files onle

import { pre_fetch } from './pre_fetch.mjs'

describe('local source files as objects (browser pre_fetch)', async () => {

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

  // fixed 23/3/25 TODO reflect Playground DTA
  // also fix this is node version
  it('import-url-dta-TA', async () => {
    await expect(JSON.stringify(
      await pre_fetch({ 'entrypoint.cul.js': await readFile('./test/cul/import-url-dta-TA.cul.js', 'utf-8'),
                         './dta-TA.cul.js': await readFile('./test/cul/dta-TA.cul.js', 'utf-8')
        })
        , null, 2)).toMatchFileSnapshot('./bundles/import-url-dta-TA.pre_fetch.snapshot');
  })

})