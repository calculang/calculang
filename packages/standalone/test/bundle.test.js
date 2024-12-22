import { expect, describe, it } from 'vitest';
import { resolve } from 'node:path';

import {compile} from '../index.js';

const cwd = import.meta.dirname;

describe('bundle output', async () => {
  it('shop should match expected', async () => {
    const m = await compile({
      entrypoint: 'entry.cul.js',
      fs: {
        'entry.cul.js': `

// shop model, formulae:
export const sales = () => units() * sales_price();

export const purchases = () => units() * purchase_price();

export const profit = () => sales() - purchases() - expenses();

// inputs:
export const sales_price = () => sales_price_in;
export const purchase_price = () => purchase_price_in;
export const units = () => units_in; // 7 * 20000 - sales_price() * 20000;
export const expenses = () => expenses_in;
`
      },
      memo: false
    });

    await expect(m.bundle).toMatchFileSnapshot('./bundles/shop.bundle.js');
  });


  it('compile savings from url should match expected', async () => {
    const m = await compile({
      entrypoint: "https://calculang.dev/models/savings/savings.cul.js",
      memo: false
    });

    await expect(m.bundle).toMatchFileSnapshot('./bundles/savings.bundle.js');
  });
})


// TODO, maybe directory better?
// pattern from mosaic
async function bundleTest(entrypoint, files) {
  let fs = {};

  files.forEach(f => {
    //fs[]
  })
  const specPath = resolve(cwd, `specs/${name}.js`);
  const htmlPath = resolve(cwd, `output/${name}.html`);
  const { default: run } = await import(specPath);
  const mc = new Coordinator(nodeConnector(), { logger: null });
  const el = await run(createAPIContext({ coordinator: mc }));
  await clientsReady(el);
  await expect(el.outerHTML).toMatchFileSnapshot(htmlPath);
}
