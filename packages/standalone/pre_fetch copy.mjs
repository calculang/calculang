 
//import {dirname, resolve} from 'node:path'
//import {readFile} from 'node:fs/promises' // Relying on NodeJS APIs to read from local FS

// this ONLY does pre-fetching of URLS/FS files
// AND replaces all_cul with all_culx

import * as Babel from './babel.mjs' // but I can conditionally use node api - prob a bad idea?

const generatorOpts = {retainLines: true, experimental_preserveFormat: true, compact: false, concise: false}//{ compact: false, concise: false, retainLines: true }//{ compact: false, retainLines: true }
const parserOpts = { tokens: true, createParenthesizedExpressions: true }

// TODO ONLY MITIGATE *FETCH* WHEN REF IS PRESENT IN OBJECT
// STILL PROCESS INPUT[REF] FOR FURTHER REFERENCES!!
// MAKE 


// returns fs. fs uses global references except for entrypoint and updates code to use global references. This is essential because e.g. ./base.cul.js can refer to different files depending on file/model structure
export async function pre_fetch(input /* url (string) or else { 'entrypoint.cul.js': `<code>` } */) {

  let url, source, fsOut = {};

  if (typeof input === 'string') {
    // string => URL or local file
    url = input;
    source = null;
  } else if (typeof input === 'object' && input !== null) {
    fsOut = {...input}
  } else {
    // TODO update this?
    throw new TypeError('Input must be either a URL string or an object containing `entrypoint.cul.js`');
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
      if (fsOut.hasOwnProperty(input)) {
        start = fsOut[input]
        isUrlParent = false // for now virtual fs only supports exact references (not relative to location)
      }
      else if (isUrl(input)) {
        start = await (await fetch(input)).text()
        isUrlParent = true
        dirname_parent = input.replace(/\/[^/]*$/, '/') // remove last slash on
      } else { // path path
        console.error('cant read local FS from web apis!')
        //start = (await readFile(resolve(input), 'utf8'))//.toString('ascii')
        //isUrlParent = false
        //dirname_parent = dirname(input)
      }

    } else if (typeof input === 'object' && input !== null) { // This can only be true for the first run
      // TODO OPTIONALLY TAKE OTHER FILES FROM HERE (not needed b/c pre_fetch_ call on next conditions on presence)
      // No: I do need this, and all code must run here (or else no all_cul replacement etc)
      start = input['entrypoint.cul.js'];
      resolved = 'entrypoint.cul.js';
      isUrlParent = false // might mean local urls work?
      dirname_parent = '.'//dirname(resolved) // 
    } else {
      throw new TypeError('input must be either a URL string or an object containing `entrypoint.cul.js`');
    }

    
    // CHOICES to make graph for all_cul replacement collection, make graph directly in visior or make it from cul_scope_ids_to_resource
    let c = 0
    const maybe_fsOut_resolved = Babel.transform(start.replaceAll('all_cul', () => `all_cul${c++}`), {
      generatorOpts,
      parserOpts,
      //errorRecovery: true, (not exposed: see #159) TODO check this again on new babel?
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
                resolved = path.node.source.value // new URL(path.node.source.value).toString() // can just be path.node.source.value 
              } else {
                if (isUrlParent) {
                  //console.log('debug', resolved, path.node.source.value)
                  // but I only want this to happen 
                  //if (!fsOut.hasOwnProperty(resolved))
                    resolved = new URL(path.node.source.value, resolved /* or dirname_parent: not necessary here */).toString()
                } else {
                  if (!fsOut.hasOwnProperty(resolved))
                    console.error('no resolve allowed in web')
                    //resolved = resolve(dirname_parent, path.node.source.value);
                }
              }

              if (!fsOut.hasOwnProperty(path.node.source.value))
                path.node.source.value = resolved

              //if (!fsOut.hasOwnProperty(path.node.source.value))
                next.push({resource: path.node.source.value/*, resolved*/}) // this seems to work TODO remote URLs
            },

          }
        })
        ]]
    }).code; // assigning this directly without keeping sourcemap for inputSourceMap is bad. ALT just store resolutions? OR replace without using babel output?

    if (!fsOut.hasOwnProperty(resolved))
      fsOut[resolved] = maybe_fsOut_resolved
    
    for (const n of next) {
        await pre_fetch_(n.resource, n.resource)
    }
  }

  await pre_fetch_(input)
  /*if (!source)
    await pre_fetch_(entrypoint, undefined, entrypoint)
  else
    await pre_fetch_(undefined, fsOut, 'source')*/

  return fsOut
}