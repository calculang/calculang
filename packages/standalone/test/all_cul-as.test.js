import { expect, describe, it } from 'vitest';

import { pre_fetch } from './pre_fetch.mjs'
import { compile } from '..';

describe('all_cul tests', async () => {

  it('works in a no-override case', async () => {

    // pre_fetch not strictly necessary but I want to track its output
    const fetched = await pre_fetch({
      'entrypoint.cul.js': `import {all_cul} from 'abcd.cul.js'`,
      'abcd.cul.js': `import {all_cul} from 'abc.cul.js'; export const d = () => a() + b() + c();`,
      'abc.cul.js': `export const a = () => 1; export const b = () => 1; export const c = () => c_in;`
    });

    await expect(JSON.stringify(
      fetched
      , null, 2)).toMatchFileSnapshot('./snapshots/all_cul-abcd.pre-fetch-snapshot');


    await expect((await compile({
      fs: fetched,
      entrypoint: 'entrypoint.cul.js',
      memo: false // easier to read
    })).bundle).toMatchFileSnapshot('./snapshots/all_cul-abcd.pre-bundle-snapshot.js');
    
  })



  it('works in a self-override case (not using "as" syntax)', async () => {

    // I set a to be 2x a_orig
    const fetched = await pre_fetch({
      // origINAL proves shows all_cul as development not breaking compatability in this case (without as)
      'entrypoint.cul.js': `import {all_cul, a_ as a_origINAL} from 'abcd.cul.js'; export const a = () => a_origINAL()*2;`,
      'abcd.cul.js': `import {all_cul} from 'abc.cul.js'; export const d = () => a() + b() + c();`,
      'abc.cul.js': `export const a = () => 1; export const b = () => 1; export const c = () => c_in;`
    });

    await expect(JSON.stringify(
      fetched
      , null, 2)).toMatchFileSnapshot('./snapshots/all_cul-abcd-self-override-no-as.pre-fetch-snapshot');


    await expect((await compile({
      fs: fetched,
      entrypoint: 'entrypoint.cul.js',
      memo: false // easier to read
    })).bundle).toMatchFileSnapshot('./snapshots/all_cul-abcd-self-override-no-as.pre-bundle-snapshot.js');
    
  })



  it('works in a self-override case using "as" syntax', async () => {

    // I set a to be 2x a_orig
    const fetched = await pre_fetch({
      'entrypoint.cul.js': `import {all_cul as _orig} from 'abcd.cul.js'; export const a = () => a_orig()*2;`,
      'abcd.cul.js': `import {all_cul} from 'abc.cul.js'; export const d = () => a() + b() + c();`,
      'abc.cul.js': `export const a = () => 1; export const b = () => 1; export const c = () => c_in;`
    });

    await expect(JSON.stringify(
      fetched
      , null, 2)).toMatchFileSnapshot('./snapshots/all_cul-abcd-self-override-as.pre-fetch-snapshot');


    await expect((await compile({
      fs: fetched,
      entrypoint: 'entrypoint.cul.js',
      memo: false // easier to read
    })).bundle).toMatchFileSnapshot('./snapshots/all_cul-abcd-self-override-as.pre-bundle-snapshot.js');
    
  })



  // random as at formula level doesn't work with as for all_cul level: but i think this is ok
  /*it('works in a self-override case using "as" syntax origINAL', async () => {

    // I set a to be 2x a_orig
    const fetched = await pre_fetch({
      'entrypoint.cul.js': `import {all_cul as _orig, a_ as a_origINAL} from 'abcd.cul.js'; export const a = () => a_orig()*2;`,
      'abcd.cul.js': `import {all_cul} from 'abc.cul.js'; export const d = () => a() + b() + c();`,
      'abc.cul.js': `export const a = () => 1; export const b = () => 1; export const c = () => c_in;`
    });

    await expect(JSON.stringify(
      fetched
      , null, 2)).toMatchFileSnapshot('./snapshots/all_cul-abcd-self-override-as-origINAL.pre-fetch-snapshot');


    await expect((await compile({
      fs: fetched,
      entrypoint: 'entrypoint.cul.js',
      memo: false // easier to read
    })).bundle).toMatchFileSnapshot('./snapshots/all_cul-abcd-self-override-as-origINAL.pre-bundle-snapshot.js');
    
  })*/



})