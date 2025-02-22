import compiler from '@calculang/calculang-js';

jest.setTimeout(2000000); // for debug

// skip because infrastructure is bad:
// direct call to compile (w memo) now depends on various bits e.g. nomemo introspection not created in test

// memo tests
test.skip.each([
  'manufacturing/base',
  // Disabling modular tests, existing memo implementation is unsupported here
  /*'manufacturing/price-change-reconciliation',
  'manufacturing/revenue-fixed-inputs',
  'manufacturing/impactsAB',
  'manufacturing/revenue-with-demand-curve',*/
  'manufacturing/simple-neg-A',
  'manufacturing/simple-neg-B',
  'manufacturing/simple-neg-C',
])('%s with memo on matches snapshot', async (d) => {
  const output = await compiler(
    `./packages/calculang-testcase-models/${d}.cul.js`,
    { memo: true }
  );

  expect({
    bundle: output.bundle,
    sourcemap: output.sourcemap.replace(/\\r/g, ''), // remove carriage returns
  }).toMatchSnapshot();
});

// this one should probably be disabled too ...... -> disabled
/*
test('compilation of revenue-fixed-inputs with memo on', async () => {
  const base_memo_on = await compiler(
    `./packages/calculang-testcase-models/manufacturing/revenue-fixed-inputs.cul.js`,
    { memo: true }
  );

  expect(base_memo_on).toMatchSnapshot();
});
*/