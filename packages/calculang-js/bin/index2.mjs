#!/usr/bin/env node

import { pre_fetch } from './pre_fetch.mjs'
import { compile, introspection } from '../../standalone/index.js'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import packagejson from '../package.json' with { type: "json" };

const stringify_introspection_info = (d) => {
  // https://gist.github.com/lukehorvat/133e2293ba6ae96a35ba
  let cul_functions = Array.from(d.cul_functions).reduce( // TODO sort here!!
    (obj, [key, value]) => Object.assign(obj, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
    {}
  );
  let cul_links = [...d.cul_links.values()];
  let cul_scope_ids_to_resource = Array.from(
    d.cul_scope_ids_to_resource
  ).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
    {}
  );
  let import_sources_to_resource = Array.from(
    d.import_sources_to_resource
  ).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
    {}
  );
  let memo_map = d.memo_map;

  let cul_input_map = Array.from(d.cul_input_map).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: [...value.values()] }), // Be careful! Maps can have non-String keys; object literals can't.
    {}
  );

  return JSON.stringify(
    {
      cul_functions,
      cul_links,
      cul_scope_ids_to_resource,
      import_sources_to_resource,
      cul_input_map,
      dot: d.dot,
      memo_map
    },
    null,
    2
  );
};


yargs(hideBin(process.argv))
  .version(packagejson.version)
  .command('compile <url>', 'todo', () => {}, async (argv) => {
    
    const fs = await pre_fetch(argv.url)

    //console.log(fs)
    
    console.log(
      (await compile({
        entrypoint: argv.url,
        fs,
        memo: false
      })).bundle
    )
  })
  .command('introspection <url>', 'todo', () => {}, async (argv) => {
    //console.info(argv)
    
    const fs = await pre_fetch(argv.url)

    //console.log(fs)
    //console.log(argv.url)
    
    console.log(//JSON.stringify(
      stringify_introspection_info(
      (await introspection(
        argv.url,
        fs
      )))//, null, 2)
    )
  })
  .demandCommand(1)
  .parse()
