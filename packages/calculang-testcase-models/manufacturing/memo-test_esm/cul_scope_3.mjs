import { profit } from "./cul_scope_0.mjs";import { costs } from "./cul_scope_0.mjs";import { units } from "./cul_scope_0.mjs";import { price } from "./cul_scope_0.mjs";import { revenue } from "./cul_scope_0.mjs";export const revenue_ = ({ units_in, price_in }) => {
  return units({ units_in }) * price({ price_in });
};

// variable costs only, OK for testing
export const costs_ = ({ units_in }) => 100 * units({ units_in });

export const profit_ = ({ units_in, price_in }) => revenue({ units_in, price_in }) - costs({ units_in });

// inputs
export const units_ = ({ units_in }) => units_in;
export const price_ = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?