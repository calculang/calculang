
import {dirname, resolve} from 'node:path'
import {readFile} from 'node:fs/promises'

import * as Babel from '../../standalone/babel.mjs' // but I can conditionally use node api - prob a bad idea?

// returns fs. fs uses global references except for entrypoint and updates code to use global references. This is essential because e.g. ./base.cul.js can refer to different files depending on file/model structure
export async function pre_fetch(entrypoint) {

  let next = []; // next imports to traverse

  let fs = {}

  async function pre_fetch_(entrypoint, resolved) {
    let start = (await readFile(resolve(resolved), 'utf8'))//.toString('ascii')

    let dirname_parent = dirname(resolved)
    
    // CHOICES to make graph for all_cul replacement collection, make graph directly in visior or make it from cul_scope_ids_to_resource
    fs[resolved] = Babel.transform(start, {
      plugins: [
        [({ types }) =>
        ({
          name: 'calculang-pre-fetching-visitor',
          visitor: {
            ImportDeclaration(path) {
              if (!path.node.source.value.includes('.cul')) return;
              
              const resolved = resolve(dirname_parent, path.node.source.value)
              path.node.source.value = resolved

              next.push({resource: path.node.source.value, resolved}) // this seems to work TODO remote URLs
            },

          }
        })
        ]]
    }).code;

    for (const n of next) {
      if (!fs.hasOwnProperty(n.resource))
        await pre_fetch_(n.resource, n.resolved)
    }
  }

  await pre_fetch_(entrypoint, entrypoint)

  return fs
}