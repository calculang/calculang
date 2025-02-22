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

program
  .version(require('../package.json').version) // reveals version of calculang-js, not introspection, problem?
  .command('compile <entrypoint.cul.js>')
  .option('--memo', 'memoization')
  .description('compile entrypoint.cul.js to entrypoint.js')
  .action(async (entrypoint, options) => {

    // to do --memo, we first need to output introspection information for a nomemo copy:

    // use fs.fileCopy to copy -nomemo
    // call compiler on that entrypoint With memo option turned off
    var nomemo = path.dirname(entrypoint) +
                  path.sep + path.basename(entrypoint, '.cul.js') + '-nomemo.cul.js'
    await fs.copyFileSync(entrypoint, nomemo, fs.constants.COPYFILE_FICLONE)
  
      {
        // done

        // then call regular compiler
        // vs. just call & save introspection-api
        await introspection(nomemo, { memo:false})
          .then((d) => {
            fs.writeFileSync(path.dirname(entrypoint) +
            path.sep + path.basename(entrypoint, '.cul.js') + '-nomemo.introspection.json', (stringify_introspection_info(d)));
          })
          .catch((e) => {
            console.log(e);
          });
      }

    // regressions expected???
    // compile... cp (overwrite), compile...
    // expect -nomemo-nomemo but otherwise, it's solid
    // memo option not used for -nomemo. So result the same, if as defined above.


    // this runs BEFORE the stuff above
    // so compile happens immediate, but should be AFTER ABOVE
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

        // todo delete existing files/folder
        var dir =
          path.dirname(entrypoint) +
          path.sep +
          path.basename(entrypoint, '.cul.js') +
          '_esm';
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }

        d.esm.forEach((scope) => {
          fs.writeFileSync(
            dir + path.sep + 'cul_scope_' + path.basename(scope.file),
            scope.source
          );
        });

        fs.writeFileSync(
          path.dirname(entrypoint) +
            path.sep +
            path.basename(entrypoint, '.cul.js') +
            '.introspection.json',
          stringify_introspection_info(d.introspection_info)
        );

        // write d.introspection_info

        //console.log(JSON.stringify(d.verbose, null, 2));

        //console.log('hello ', d);
        //fs.writeFileSync(dir + path.sep + 'a', d.a);
      })
      .catch((err) => {
        console.log(err);
      });
  });

program
  .command('introspect <entrypoint.cul.js>')
  .description('introspect entrypoint.cul.js')
  .option('--memo', 'memoization (only designed for non-modular models now)')
  .action((entrypoint, options) => {
    introspection(entrypoint, options)
      .then((d) => {
        console.log(stringify_introspection_info(d));
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
  .option('--memo', 'memoization (you probably dont want this for dot command)')
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
