
import { compile } from '../../standalone/index.js'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


yargs(hideBin(process.argv))
  .command('compile <url>', 'todo', () => {}, async (argv) => {
    console.info(argv)
    console.log(
      (await compile({
        entrypoint: 'e',
        fs: {
          'e': `export const a = () => a_in;`
        },
        memo: false
      })).bundle
    )
  })
  .demandCommand(1)
  .parse()
