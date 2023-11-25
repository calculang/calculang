import introspection from '@calculang/introspection-api';

// TODO I don't expect this to work for modular models yet because of dependence on -nomemo run first !

//jest.setTimeout(20000);
jest.setTimeout(2000000); // for debug!

test.each([
  'manufacturing/base',
    // Disabling modular tests, existing memo implementation is unsupported here
  /*
  'manufacturing/price-change-reconciliation',
  'manufacturing/revenue-fixed-inputs',
  'manufacturing/impactsAB',
  'manufacturing/revenue-with-demand-curve',*/
  'manufacturing/simple-neg-A',
  'manufacturing/simple-neg-B',
  'manufacturing/simple-neg-C',
])('%s', async (d) => {
  const output = await introspection(
    `./packages/calculang-testcase-models/${d}.cul.js`,
    { memo: true }
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

  const sort_fn_text = (a, b) => { // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const nameA = a.name; //a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name; //b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  };

  let base_memo_on_cul_functions_no_locs = [...base_memo_on.cul_functions.values()].sort(sort_fn_text).map(({loc, ...d}) => (d));
  let test_memo_off_cul_functions_no_locs = [...test_memo_off.cul_functions.values()].sort(sort_fn_text).map(({loc, ...d}) => (d)); // poss ordering prob in comparison?

  expect(base_memo_on.cul_links).toEqual(test_memo_off.cul_links);
  expect(base_memo_on.cul_input_map).toEqual(test_memo_off.cul_input_map);
  expect(base_memo_on_cul_functions_no_locs).toEqual(test_memo_off_cul_functions_no_locs);
});

// should disable? disabling
/*
test('introspection of revenue-fixed-inputs with memo on', async () => {
  const base_memo_on = await introspection(
    `./packages/calculang-testcase-models/manufacturing/revenue-fixed-inputs.cul.js`,
    { memo: true }
  );

  expect(base_memo_on).toMatchSnapshot();
});*/

// this is affected by a lot of things, including overrides-of-overrides problem
/*test('introspection of price-change-reconciliation with memo on', async () => {
  const base_memo_on = await introspection(
    `./packages/calculang-testcase-models/manufacturing/price-change-reconciliation.cul.js`,
    { memo: true }
  );

  expect(base_memo_on.cul_links).toMatchSnapshot();
});
*/
// dupe to facilitate debugging
/*test('introspection of impactsAB with memo on', async () => {
  const base_memo_on = await introspection(
    `./packages/calculang-testcase-models/manufacturing/impactsAB.cul.js`,
    { memo: true }
  );

  //expect(base_memo_on.cul_links).toMatchSnapshot();
});
*/