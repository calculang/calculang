import { revenue_impact } from "./cul_scope_0.mjs";import { B_revenue } from "./cul_scope_2.mjs";import { revenue } from "./cul_scope_3.mjs";
export { revenue };

export const units = ({}) => 100;
export const price = ({}) => 500;

// this fixes (or constrains) the 2 inputs in base, so that this model is independent of inputs
// e.g. revenue() and profit() can be called without inputs and the values specified above are used