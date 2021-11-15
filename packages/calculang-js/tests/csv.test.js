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
    bundle: output.bundle,
    sourcemap: output.sourcemap.replace(/\\r/g, ''), // remove carriage returns
  }).toMatchSnapshot();
});

//
