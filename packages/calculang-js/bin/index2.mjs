
import { pre_fetch } from './pre_fetch.mjs'
import { compile } from '../../standalone/index.js'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


yargs(hideBin(process.argv))
  .command('compile <url>', 'todo', () => {}, async (argv) => {
    //console.info(argv)
    
    const fs = await pre_fetch(argv.url)
    
    console.log(
      (await compile({
        entrypoint: argv.url,
        fs,
        memo: false
      })).bundle
    )
  })
  .demandCommand(1)
  .parse()
