// run with node --experimental-network-imports

import {compile} from './index.js'

console.log((await compile({
  entrypoint: 'a.cul.js',
  fs: {
    'a.cul.js': `export const a = () => a_in;`
  }
})).js.a({a_in:10}))
