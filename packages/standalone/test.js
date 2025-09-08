// run with node --experimental-network-imports
// note: this flag is dropped in newer node versions: https://github.com/nodejs/node/pull/53822
// so todo experiment with other runtimes

import {compile} from './index.js'

console.log((await compile({
  entrypoint: 'a.cul.js',
  fs: {
    'a.cul.js': `export const a = () => a_in;`
  }
})).js.a({a_in:10}))

console.log((await compile({
  entrypoint: 'a.cul.js',
  fs: {
    'a.cul.js': `export const a = () => a_in;`
  }
})))
