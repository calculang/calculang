/**
 * @jest-environment node
 */

import compiler from '@calculang/calculang-js';

jest.setTimeout(20000);

test.each([
  'manufacturing/base',
  'manufacturing/price-change-reconciliation',
  'manufacturing/revenue-fixed-inputs',
  'manufacturing/revenue-with-demand-curve',
  'manufacturing/simple-neg-A',
  'manufacturing/simple-neg-B',
  'manufacturing/simple-neg-C',
])('%s', async (d) => {
  const output = await compiler(
    `./packages/calculang-testcase-models/${d}.cul.js`,
    {}
  );

  expect(output).toMatchSnapshot();
});