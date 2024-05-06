import { price } from "./cul_scope_0.mjs";import { units } from "./cul_scope_0.mjs";import { revenue } from "./cul_scope_0.mjs";import { revenue_ } from "./cul_scope_2.mjs";
export { revenue_ };

export const units_ = ({}) => 100;
export const price_ = ({}) => 500;

// this fixes (or constrains) the 2 inputs in base, so that this model is independent of inputs
// e.g. revenue() and profit() can be called without inputs and the values specified above are used