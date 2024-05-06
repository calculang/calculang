import { costs } from "./cul_scope_2.mjs";import { units } from "./cul_scope_0.mjs";import { profit } from "./cul_scope_0.mjs";import { price } from "./cul_scope_0.mjs";import { revenue } from "./cul_scope_0.mjs";export const revenue_ = ({ price_in }) => {
  return units({ price_in }) * price({ price_in });
};

// variable costs only, OK for testing
export const costs_ = ({ price_in }) => 100 * units({ price_in });

export const profit_ = ({ price_in }) => revenue({ price_in }) - costs({ price_in });

// inputs
export const units_ = ({ units_in }) => units_in;
export const price_ = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?