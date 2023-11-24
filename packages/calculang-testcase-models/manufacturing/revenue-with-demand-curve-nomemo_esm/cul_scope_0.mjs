import { revenue, price } from "./cul_scope_1.mjs";
export { revenue, price };

// demand-curve constraint:
export const units = ({ price_in }) => 1000 - 200 * price({ price_in });

// this model has a constraint on units so that price is the only model input, and units are derived from the price input