#!/usr/bin/env node

import { pre_fetch } from './pre_fetch.mjs'
import { bundleIntoOne, compile_new, introspection } from '@calculang/standalone'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import packagejson from '../package.json' with { type: "json" };

// cwd not always the cwd but the root of project - FIX?

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
  .command('compile <url>', 'compile and output to stdout',
    (yargs) => {
      // return ?
      yargs.option('memo', {
        alias: 'm',
        type: 'boolean',
        description: 'Enable memoization',
        default: true
      });
    },
    async (argv) => {
    
      const fs = await pre_fetch({entrypoint:argv.url})
      const entrypoint = argv.url

      let introspection_a;
      introspection_a = await introspection(entrypoint, fs);
      //else introspection_a = await introspection("entry.cul.js", {'entry.cul.js': await (await fetch(entrypoint)).text() }); // TODO move fetching into pre_introspection pass
      let compiled;
      compiled = await compile_new(entrypoint, introspection_a.fs0, introspection_a); // entrypoint=url works if I just configure fs here
      //debugger;
      //else  compiled = await compile_new("entry.cul.js", {'entry.cul.js': await (await fetch(entrypoint)).text() }, introspection_a); // entrypoint=url works if I just configure fs here
      const bundle = bundleIntoOne(compiled, introspection_a, argv.memo);

      console.log(bundle)



      //console.log(fs)
      
      /*console.log(
        (await compile({
          entrypoint: argv.url,
          fs,
          memo: argv.memo
        })).bundle
      )*/
  })
  .command('introspection <url>', 'todo', () => {}, async (argv) => {
    //console.info(argv)
    
    const fs = await pre_fetch({entrypoint:argv.url})

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
