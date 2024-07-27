// run with node --experimental-network-imports

import {compile} from './index.js'

console.log(compile({
  entrypoint: 'a.cul.js',
  fs: {
    'a.cul.js': `export const a = () => a_in;`
  }
}))
