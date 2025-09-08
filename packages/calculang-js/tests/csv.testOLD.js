/**
 * @jest-environment node
 */

import compiler from '@calculang/calculang-js';

jest.setTimeout(20000);

test.each(['manufacturing/products'])('%s', async (d) => {
  const output = await compiler(
    `./packages/calculang-testcase-models/${d}.cul.js`,
    {}
  );

  expect({
    bundle: output.bundle.replaceAll(/\\\\r/g, '').replaceAll(/\\r/g, ''),
    sourcemap: output.sourcemap.replaceAll(/\\\\r/g, '').replaceAll(/\\r/g, ''), // remove carriage returns. Can't remove from mappings! so change csv file to LF to run locally
  }).toMatchSnapshot();
});

//
