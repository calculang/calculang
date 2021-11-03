import introspection from '@calculang/introspection-api';

//jest.setTimeout(20000);
jest.setTimeout(2000000); // for debug!

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
  const output = await introspection(
    `./packages/calculang-testcase-models/${d}.cul.js`,
    {}
  );

  expect({
    cul_scope_ids_to_resource: output.cul_scope_ids_to_resource,
    import_sources_to_resource: output.import_sources_to_resource,
    cul_input_map: output.cul_input_map,
    cul_functions: output.cul_functions,
    cul_links: output.cul_links,
  }).toMatchSnapshot();
});

// memo test is that base, with memoization on, should match memo-test with memoization off

test('introspection of base with memo on matches memo-test with memo off', async () => {
  const base_memo_on = await introspection(
    `./packages/calculang-testcase-models/manufacturing/base.cul.js`,
    { memo: true }
  );
  const test_memo_off = await introspection(
    `./packages/calculang-testcase-models/manufacturing/memo-test.cul.js`,
    {}
  );

  expect(base_memo_on.cul_links).toEqual(test_memo_off.cul_links);
});

test('introspection of revenue-fixed-inputs with memo on', async () => {
  const base_memo_on = await introspection(
    `./packages/calculang-testcase-models/manufacturing/revenue-fixed-inputs.cul.js`,
    { memo: true }
  );

  expect(base_memo_on).toMatchSnapshot();
});

// this is affected by a lot of things, including overrides-of-overrides problem
test('introspection of price-change-reconciliation with memo on', async () => {
  const base_memo_on = await introspection(
    `./packages/calculang-testcase-models/manufacturing/price-change-reconciliation.cul.js`,
    { memo: true }
  );

  expect(base_memo_on.cul_links).toMatchSnapshot();
});
