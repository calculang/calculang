import { expect, describe, it } from 'vitest';

import {calcudata} from '../src/index.js'

describe("type calcudata output is valid", () => {
  it("small test", () => {
    expect(
      calcudata({
        type: 'calculang',
        models: [{
          a: ({a_in}) => a_in,
          square: ({a_in}) => a_in * a_in
        }],
        input_cursors: [{}],
        input_domains: {
          a_in: [1,2,5]
        },
        outputs: ['a', 'square']
      })
    ).toMatchFileSnapshot('./output/calcudata-output-small-test.cul.js')
  })
})