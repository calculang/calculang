
import {dirname, resolve} from 'node:path'
import {readFile} from 'node:fs/promises'

import * as Babel from '../../standalone/babel.mjs' // but I can conditionally use node api - prob a bad idea?

// returns fs. fs uses global references except for entrypoint and updates code to use global references. This is essential because e.g. ./base.cul.js can refer to different files depending on file/model structure
export async function pre_fetch({url, source}) {

  //console.log(source)
  let next = []; // next imports to traverse

  let fs = {}

  function isUrl(url) {
    try {
      new URL(url)
      return true
    } catch(e) {
      return false
    }
  }

  async function pre_fetch_(entrypoint, source, resolved) { // should i be getting to file:// urls in all cases for better consistency?
    let start, isUrlParent, dirname_parent;

    if (source) { // only poss for initial
      start = source;
      entrypoint = 'source.cul.js';
      isUrlParent = false // might mean local urls work?
      dirname_parent = '.'//dirname(resolved) // 
    } else {
      if (isUrl(resolved)) {
        start = await (await fetch(resolved)).text()
        isUrlParent = true
        dirname_parent = resolved.replace(/\/[^/]*$/, '/') // remove last slash on
      } else { // path path
        start = (await readFile(resolve(resolved), 'utf8'))//.toString('ascii')
        isUrlParent = false
        dirname_parent = dirname(resolved)
      }
    }

    
    // CHOICES to make graph for all_cul replacement collection, make graph directly in visior or make it from cul_scope_ids_to_resource
    fs[resolved] = Babel.transform(start, {
      plugins: [
        [({ types }) =>
        ({
          name: 'calculang-pre-fetching-visitor',
          visitor: {
            ImportDeclaration(path) {
              if (!path.node.source.value.includes('.cul.js')) return;
              
              //let resolved2;
              //if (isUrlHere) resolved = 'TODO' // I need to consider if New reference is a url here
                //resolved = ;
              //else resolved = resolve(dirname_parent, path.node.source.value);

              if (isUrl(path.node.source.value)) {
                resolved = new URL(path.node.source.value).toString()
              } else {
                if (isUrlParent) {
                  //console.log('debug', resolved, path.node.source.value)
                  resolved = new URL(path.node.source.value, resolved /* or dirname_parent: not necessary here */).toString()
                } else {
                  resolved = resolve(dirname_parent, path.node.source.value);
                }
              }

              path.node.source.value = resolved

              next.push({resource: path.node.source.value, resolved}) // this seems to work TODO remote URLs
            },

          }
        })
        ]]
    }).code;

    for (const n of next) {
      if (!fs.hasOwnProperty(n.resource))
        await pre_fetch_(n.resource, undefined, n.resolved)
    }
  }

  if (!source)
    await pre_fetch_(entrypoint, undefined, entrypoint)
  else
    await pre_fetch_(undefined, source, 'source.cul.js')

  return fs
}