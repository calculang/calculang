import compiler from '@calculang/calculang-js';

jest.setTimeout(2000000); // for debug

test.each([
  'manufacturing/base',
  'manufacturing/base-constants', // test a constant
  'manufacturing/price-change-reconciliation',
  'manufacturing/revenue-fixed-inputs',
  'manufacturing/impactsAB',
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
