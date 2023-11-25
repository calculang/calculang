import { units } from "./cul_scope_0.mjs";import { price } from "./cul_scope_0.mjs";import { revenue } from "./cul_scope_0.mjs";import { revenue_, price_ } from "./cul_scope_2.mjs";
export { revenue_, price_ };

// demand-curve constraint:
export const units_ = ({ price_in }) => 1000 - 200 * price({ price_in });

// this model has a constraint on units so that price is the only model input, and units are derived from the price input