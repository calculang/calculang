// TODO permit strings!!

// THE TEST FOR THIS IS IMPORTS INTO WORKERS

// I wonder if flechette is faster for ipc as cols?: I used this in development of a lot of things
//import { tableFromArrays, tableToIPC } from './imports/flechette.mjs'; // self-contained

//const aq = import("./imports/arquero.mjs");

const aq = (typeof window === 'undefined') ? await import('arquero') : await import('https://esm.sh/arquero@7.2.0') // Is this all I needed for node+browser+worker compat?


// https://stackoverflow.com/questions/18957972/cartesian-product-of-objects-in-javascript
export const cartesianProduct = (input, current) => {
  if (!input || !input.length) { return []; }

  var head = input[0];
  var tail = input.slice(1);
  var output = [];

  for (var key in head) {
    for (var i = 0; i < head[key].length; i++) {
      var newCurrent = copy(current);
      newCurrent[key] = head[key][i];
      if (tail.length) {
        var productOfTail =
          cartesianProduct(tail, newCurrent);
        output = output.concat(productOfTail);
      } else output.push(newCurrent);
    }
  }
  return output;
}



// https://stackoverflow.com/questions/18957972/cartesian-product-of-objects-in-javascript

function copy(obj) {
  var res = {};
  for (var p in obj) res[p] = obj[p];
  return res;
}




// consider error handling, e.g. ERROR default return in original calcudata?

// cursor takes priority over domain, but
// this api has no concept that some domains not mapped
// so combinatorial explosion happens if not used carefully
// (be deliberate about domains provided!)

// cursor inputs are not included in output: only domain inputs
// if you prefer an input in the output, you can provide it as a domain (even if it should have a fixed value)
// alternatively just join afterwards
export const calcudata = ({
  type = 'objects', // or 'arrow', 'arrow-ipc' or 'arquero' maybe Or "load-calculang"
  models,
  input_domains /*Bug should be array*/,
  input_cursors,
  outputs,
  orientation = 'columns'
}) => {
  if (!models.length) { console.error('no models provided!'); return };
  // we populate an object for a cartesian product across: models, cursors and output formulae...
  let object_for_cp = {
    model_id: models.map((_, i) => i),
    input_cursor_id: input_cursors.map((_, i) => i),
  };

  // and input domains (permits overwriting model_id, input_cursor_id domains):
  Object.entries(input_domains).forEach(([k, v]) => {
    object_for_cp[k] = v;
  });

  //return Object.entries(object_for_cp).map(([k,v]) => ({[k]:v}))
  // do the cartesian product:
  let cp = cartesianProduct(
    Object.entries(object_for_cp).map(([k, v]) => ({ [k]: v }))
  ); // cartesianProduct wants a funny array structure

  // complete inputs model needs by adding inputs from the cursor:
  cp = cp.map((d) => ({ ...input_cursors[d.input_cursor_id], ...d })); // TODO no overlap/error checking here. pref to domains, not inputs

  // now we run the model:
  let out = {}

  //cp = cp.map(d => ({...d, value: models[d.model_id][d.formula](d)})) // no resriction to necessary inputs formula-specific or not TODO? +pushing some unnecessary fields to model... problem?

  //console.table(cp)
  Object.keys(input_domains).forEach(i => {
    out[i] = cp.map(d => d[i])
  })

  out['model_id'] = cp.map(d => d.model_id)
  out['input_cursor_id'] = cp.map(d => d.input_cursor_id)

  outputs.forEach(f => {
    out[f] = cp.map(d => models[d.model_id][f](d))
  })

  //console.log(out)

  // todo make 'type' option - API TODO

  //const table = tableFromArrays(out)

  /*if (type.includes('arrow') && orientation == 'columns') {
    if (type == 'arrow-ipc')
      return tableToIPC(table) // is IPC necessary when not using a worker?
    else return table
  }*/

  //const tableAq = aq.table(table)

  /*if (type == 'objects') {

  }*/

  const table0 = aq.table(out)
  let table1

  if (orientation == 'rows')
    table1 = table0.fold(outputs, { as: ["formula", "value"] })
  else
    table1 = table0

  if (type == 'arquero')
    return table1
  if (type == 'arrow')
    return table1.toArrow()
  if (type == 'arrow-ipc')
    return table1.toArrowIPC()
  else
    return table1.objects()
}

/* poorly done tests:

const test = {
  models: [{a: () => 1, b: () => 2}], // todo test with "string"
  input_cursors: [{input_1: 1}],
  input_domains: {
    domain_1: [0,1]
  },
  outputs: ['a','b']
}


console.log('arrow cols',
  calcudata({
  type: 'arrow',
  orientation: 'columns',
  ...test
}))


console.log('arrow rows',
  calcudata({
  type: 'arrow',
  orientation: 'rows',
  ...test
}))


console.log('arrow-ipc cols',
  calcudata({
  type: 'arrow-ipc',
  orientation: 'columns',
  ...test
}))


console.log('arrow-ipc rows',
  calcudata({
  type: 'arrow-ipc',
  orientation: 'rows',
  ...test
}))



console.log('objects cols',
  calcudata({
  type: 'objects',
  orientation: 'columns',
  ...test
}))


console.log('objects rows',
  calcudata({
  type: 'objects',
  orientation: 'rows',
  ...test
}))
*/