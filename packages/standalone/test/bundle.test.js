import { expect, describe, it } from 'vitest';

import {compile} from '../index.js';

describe('bundle output', () => {
  it('shop should match expecte', async () => {
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

    expect(m.bundle).toMatchFileSnapshot('./bundles/shop.bundle.js');
  });
})

