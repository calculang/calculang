
import {dirname, resolve} from 'node:path'
import {readFile} from 'node:fs/promises' // Relying on NodeJS APIs to read from local FS

// this ONLY does pre-fetching of URLS/FS files
// AND replaces all_cul with all_culx

import * as Babel from '../../standalone/babel.mjs' // but I can conditionally use node api - prob a bad idea?

// returns fs. fs uses global references except for entrypoint and updates code to use global references. This is essential because e.g. ./base.cul.js can refer to different files depending on file/model structure
export async function pre_fetch(input /* url (string) or else { source: `<code>` } */) {

  let url, source, fsOut = {};

  if (typeof input === 'string') {
    // string => URL or local file
    url = input;
    source = null;
  } else if (typeof input === 'object' && input !== null) {
    fsOut = {...input}
  } else {
    throw new TypeError('Input must be either a URL string or an object containing `url` and `source`.');
  }




  //console.log(source)
  let next = []; // next imports to traverse

  //let fsOut = {}

  function isUrl(url) {
    try {
      new URL(url)
      return true
    } catch(e) {
      return false
    }
  }

  async function pre_fetch_(input) { // should i be getting to file:// urls in all cases for better consistency?
    let start, isUrlParent, dirname_parent, resolved = input;

    if (typeof input === 'string') {
      // string => URL or local file
      if (isUrl(input)) {
        start = await (await fetch(input)).text()
        isUrlParent = true
        dirname_parent = input.replace(/\/[^/]*$/, '/') // remove last slash on
      } else { // path path
        start = (await readFile(resolve(input), 'utf8'))//.toString('ascii')
        isUrlParent = false
        dirname_parent = dirname(input)
      }

    } else if (typeof input === 'object' && input !== null) {
      // TODO OPTIONALLY TAKE OTHER FILES FROM HERE (not needed b/c pre_fetch_ call on next conditions on presence)
      // No: I do need this, and all code must run here (or else no all_cul replacement etc)
      start = input.source;
      resolved = 'source';
      isUrlParent = false // might mean local urls work?
      dirname_parent = '.'//dirname(resolved) // 
    } else {
      throw new TypeError('input must be either a URL string or an object containing `source`');
    }

    
    // CHOICES to make graph for all_cul replacement collection, make graph directly in visior or make it from cul_scope_ids_to_resource
    let c = 0
    fsOut[resolved] = Babel.transform(start.replaceAll('all_cul', () => `all_cul${c++}`), {
      //errorRecovery: true, (not exposed: see #159)
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
                  // but I only want this to happen 
                  //if (!fsOut.hasOwnProperty(resolved))
                    resolved = new URL(path.node.source.value, resolved /* or dirname_parent: not necessary here */).toString()
                } else {
                  if (!fsOut.hasOwnProperty(resolved))
                    resolved = resolve(dirname_parent, path.node.source.value);
                }
              }

              if (!fsOut.hasOwnProperty(path.node.source.value))
                path.node.source.value = resolved

              if (!fsOut.hasOwnProperty(path.node.source.value))
                next.push({resource: path.node.source.value/*, resolved*/}) // this seems to work TODO remote URLs
            },

          }
        })
        ]]
    }).code;

    for (const n of next) {
      if (!fsOut.hasOwnProperty(n.resource))
        await pre_fetch_(n.resource)
    }
  }

  await pre_fetch_(input)
  /*if (!source)
    await pre_fetch_(entrypoint, undefined, entrypoint)
  else
    await pre_fetch_(undefined, fsOut, 'source')*/

  return fsOut
}