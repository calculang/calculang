
    const aq = (typeof window === 'undefined') ? await import('arquero') : await import('https://esm.sh/arquero@7.2.0') // Is this all I needed for node+browser+worker compat?

const flechette = (typeof window === 'undefined') ? await import('@uwdata/flechette') : await import('https://esm.sh/@uwdata/flechette') // Is this all I needed for node+browser+worker compat?


const arr = [255,255,255,255,48,1,0,0,16,0,0,0,0,0,10,0,12,0,10,0,9,0,4,0,10,0,0,0,16,0,0,0,0,1,4,0,8,0,8,0,0,0,4,0,8,0,0,0,4,0,0,0,5,0,0,0,204,0,0,0,148,0,0,0,100,0,0,0,48,0,0,0,4,0,0,0,84,255,255,255,24,0,0,0,0,0,2,1,4,0,0,0,6,0,0,0,115,113,117,97,114,101,0,0,72,255,255,255,0,0,0,1,8,0,0,0,124,255,255,255,32,0,0,0,0,0,2,1,4,0,0,0,15,0,0,0,105,110,112,117,116,95,99,117,114,115,111,114,95,105,100,0,120,255,255,255,0,0,0,1,8,0,0,0,172,255,255,255,28,0,0,0,0,0,2,1,4,0,0,0,8,0,0,0,109,111,100,101,108,95,105,100,0,0,0,0,164,255,255,255,0,0,0,1,8,0,0,0,216,255,255,255,24,0,0,0,0,0,2,1,4,0,0,0,4,0,0,0,98,95,105,110,0,0,0,0,204,255,255,255,0,0,0,1,8,0,0,0,12,0,16,0,12,0,11,0,10,0,4,0,12,0,0,0,32,0,0,0,0,0,2,1,4,0,0,0,4,0,0,0,97,95,105,110,0,0,0,0,8,0,12,0,8,0,7,0,8,0,0,0,0,0,0,1,8,0,0,0,0,0,0,0,255,255,255,255,72,1,0,0,20,0,0,0,0,0,0,0,12,0,22,0,20,0,19,0,12,0,4,0,12,0,0,0,80,0,0,0,0,0,0,0,20,0,0,0,0,0,0,3,4,0,10,0,24,0,12,0,8,0,4,0,10,0,0,0,20,0,0,0,184,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,5,5,5,5,5,0,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,4,4,4,4,4,25,25,25,25,25,0]


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

export const a = () => a_in;
  export const b = () => b_in;
  

//export const random_seed = () => random_seed_in;

// TODO loop through input_domains

// I need to calc an index

const input_domains = {"a_in":[1,2,5],"b_in":[1,2,3,4,5]}; // order matters

export const lookup_fields = () => [a(),b()]

export const lookup_fields_index = () => [[1,2,5].indexOf(a()),[1,2,3,4,5].indexOf(b())] // just call this indexes? 

const cardinalities = () => [3,5]

export const cardinality_factors = () => [...cardinalities()].reverse().reduce((a,v) => [...a, v*a[a.length-1]],[1]).reverse().slice(1)

export const index = () => {
  return lookup_fields_index().reduce((a,v, i) => a + v*cardinality_factors()[i], 0)
  /*input_domains.entries().reduce((a,v, i) => {
    return a + v[1].indexOf()
    }, 0)*/
  
};
// TODO

// see: https://observablehq.com/@jheer/from-apache-arrow-to-javascript-objects
export const row = () => table.get(index())

// each output fns like this:


export const square = () => row().square;
  


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
