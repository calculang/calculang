
    const aq = (typeof window === 'undefined') ? await import('arquero') : await import('https://esm.sh/arquero@7.2.0') // Is this all I needed for node+browser+worker compat?

const flechette = (typeof window === 'undefined') ? await import('@uwdata/flechette') : await import('https://esm.sh/@uwdata/flechette') // Is this all I needed for node+browser+worker compat?


const arr = [255,255,255,255,40,1,0,0,16,0,0,0,0,0,10,0,12,0,10,0,9,0,4,0,10,0,0,0,16,0,0,0,0,1,4,0,8,0,8,0,0,0,4,0,8,0,0,0,4,0,0,0,5,0,0,0,200,0,0,0,140,0,0,0,88,0,0,0,48,0,0,0,4,0,0,0,88,255,255,255,24,0,0,0,0,0,2,1,4,0,0,0,6,0,0,0,115,113,117,97,114,101,0,0,76,255,255,255,0,0,0,1,8,0,0,0,128,255,255,255,20,0,0,0,0,0,2,1,4,0,0,0,1,0,0,0,97,0,0,0,112,255,255,255,0,0,0,1,8,0,0,0,164,255,255,255,32,0,0,0,0,0,2,1,4,0,0,0,15,0,0,0,105,110,112,117,116,95,99,117,114,115,111,114,95,105,100,0,160,255,255,255,0,0,0,1,8,0,0,0,212,255,255,255,28,0,0,0,0,0,2,1,4,0,0,0,8,0,0,0,109,111,100,101,108,95,105,100,0,0,0,0,204,255,255,255,0,0,0,1,8,0,0,0,12,0,16,0,12,0,11,0,10,0,4,0,12,0,0,0,32,0,0,0,0,0,2,1,4,0,0,0,4,0,0,0,97,95,105,110,0,0,0,0,8,0,12,0,8,0,7,0,8,0,0,0,0,0,0,1,8,0,0,0,255,255,255,255,72,1,0,0,20,0,0,0,0,0,0,0,12,0,22,0,20,0,19,0,12,0,4,0,12,0,0,0,40,0,0,0,0,0,0,0,20,0,0,0,0,0,0,3,4,0,10,0,24,0,12,0,8,0,4,0,10,0,0,0,20,0,0,0,184,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,0,0,0,0,0,1,4,25,0,0,0,0,0]


const u = new Uint8Array(arr)

//console.log(u)

// arquero works too
//console.log(aq.fromArrow(u))

const table = flechette.tableFromIPC(u)

/*

console.log(JSON.stringify(table.schema.fields, 0, 2));

// random access pattern: E s/t better?
console.log(table.getChild('random_seed_in').at(0));*/

// each key is an input

export const random_seed = () => random_seed_in;

// TODO loop through input_domains

// I need to calc an index

export const index = () => random_seed();
// TODO

// see: https://observablehq.com/@jheer/from-apache-arrow-to-javascript-objects
export const row = () => table.get(index())

// each output fns like this:

export const square = () => row().square;
  export const a = () => row().a;
  


/*export const policy_term = () => {
  //return table.getChild('policy_term').at(index())
  return row().policy_term
}*/

// this is only allowed with memo:false, due to order of memo bundle output
//console.log(policy_term({random_seed_in:1}))
// calculang calls outside 

// console.log()

// run this with
// : npx cul-js compile ./simulate-ul-nb-pvs-OUT-CALCUDATA.cul.js --memo=false | node --input-type=module
