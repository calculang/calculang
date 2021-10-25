#!/usr/bin/env node

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
        console.log(d);
        console.log(process.cwd());
        console.log('options were: ' + JSON.stringify(options));
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
