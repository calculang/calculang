#!/usr/bin/env node

/*
Copyright (C) 2021  DCN Consulting Ltd (incorporated in Ireland)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3,
as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const path = require('path');
const fs = require('fs');

const { program } = require('commander');
const introspection = require('@calculang/introspection-api').default;
const compiler = require('@calculang/calculang-js').default;

program
  .version(require('../package.json').version) // reveals version of calculang-js, not introspection, problem?
  .command('compile <entrypoint.cul.js>')
  .description('Compile entrypoint.cul.js to entrypoint.js')
  .action((entrypoint, options) => {
    compiler(entrypoint, options)
      .then((d) => {
        fs.writeFileSync(
          path.dirname(entrypoint) +
            path.sep +
            path.basename(entrypoint, '.cul.js') +
            '.js',
          d.bundle
        ); // is this portable?
        fs.writeFileSync(
          path.dirname(entrypoint) +
            path.sep +
            path.basename(entrypoint, '.cul.js') +
            '.js.map',
          d.sourcemap
        ); // is this portable?
      })
      .catch((err) => {
        console.log(err);
      });
  });

program
  .command('introspect <entrypoint.cul.js>')
  .description('Introspect entrypoint.cul.js')
  .option('--memo', 'memoization (not working!)')
  .action((entrypoint, options) => {
    introspection(entrypoint, options)
      .then((d) => {
        // https://gist.github.com/lukehorvat/133e2293ba6ae96a35ba
        let cul_functions = Array.from(d.cul_functions).reduce(
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

        let cul_input_map = Array.from(d.cul_input_map).reduce(
          (obj, [key, value]) =>
            Object.assign(obj, { [key]: [...value.values()] }), // Be careful! Maps can have non-String keys; object literals can't.
          {}
        );

        console.log(
          JSON.stringify({
            cul_functions,
            cul_links,
            cul_scope_ids_to_resource,
            import_sources_to_resource,
            cul_input_map,
            dot: d.dot,
          })
        );
        //console.log(process.cwd());
        //console.log('options were: ' + JSON.stringify(options));
      })
      .catch((e) => {
        console.log(e);
      });
  });

program
  .command('dot <entrypoint.cul.js>')
  .description('get the dot output, can be piped to dot command')
  .action((entrypoint, options) => {
    introspection(entrypoint, options)
      .then((d) => {
        console.log(d.dot);
      })
      .catch((e) => {
        console.log(e);
      });
  });

program.parse(process.argv);

// move to async? https://github.com/tj/commander.js/#action-handler
