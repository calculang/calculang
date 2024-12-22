
import {resolve} from 'node:path'
import {readFile} from 'node:fs/promises'

import * as Babel from '../../standalone/babel.mjs' // but I can conditionally use node api - prob a bad idea?

// returns fs
export async function pre_fetch(entrypoint) {

  let next = []; // next imports to traverse

  let fs = {}

  async function pre_fetch_(entrypoint) {
    fs[entrypoint] = (await readFile(resolve(entrypoint), 'utf8'))//.toString('ascii')

    let code = fs[entrypoint]

    // CHOICES to make graph for all_cul replacement collection, make graph directly in visior or make it from cul_scope_ids_to_resource
    Babel.transform(code, {
      plugins: [
        [({ types }) =>
        ({
          name: 'calculang-pre-fetching-visitor',
          visitor: {
            ImportDeclaration(path) {
              if (!path.node.source.value.includes('.cul')) return;

              next.push({resource: path.node.source.value}) // TODO track resource base?
            },

          }
        })
        ]]
    });

    for (const n of next) {
      if (!fs.hasOwnProperty(n.resource))
        await pre_fetch_(n.resource)
    }
  }

  await pre_fetch_(entrypoint)

  return fs
}