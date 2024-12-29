import { cartesianProduct } from "./calcudata";

import { bool, dictionary, float32, int32, tableFromArrays, tableToIPC, utf8 } from 'https://cdn.jsdelivr.net/npm/@uwdata/flechette/dist/flechette.mjs';


// cursor takes priority over domain, but
// this api has no concept that some domains not mapped
// so combinatorial explosion happens if not used carefully
// (be deliberate about domains provided!)
export const calcudata_arrow = ({
  models,
  input_domains /*Bug should be array*/,
  input_cursors,
  outputs,
  pivot = true 
}) => {
  if (pivot == false) console.error('arrow version of calcudata doesnt support pivot false')
  if (!models.length) return;
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


    return tableToIPC(
    tableFromArrays(
      
        out
      
    ))
  }
