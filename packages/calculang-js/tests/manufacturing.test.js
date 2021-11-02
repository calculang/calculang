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
  'manufacturing/memo-test',
])('%s', async (d) => {
  const output = await compiler(
    `./packages/calculang-testcase-models/${d}.cul.js`,
    {}
  );

  expect({
    bundle: output.bundle,
    sourcemap: output.sourcemap.replace(/\\r/g, ''), // remove carriage returns
  }).toMatchSnapshot();

  // memo test is that base, with memoization on, should match memo-test with memoization off (excepting filename refs!)
});

// memo tests
test.each(['manufacturing/base'])(
  '%s with memo on matches snapshot',
  async (d) => {
    const output = await compiler(
      `./packages/calculang-testcase-models/${d}.cul.js`,
      { memo: true }
    );

    expect({
      bundle: output.bundle,
      sourcemap: output.sourcemap.replace(/\\r/g, ''), // remove carriage returns
    }).toMatchSnapshot();
  }
);
