import { price } from "./cul_scope_0.mjs";import { units } from "./cul_scope_0.mjs";import { profit } from "./cul_scope_0.mjs";import { costs } from "./cul_scope_0.mjs";import { revenue } from "./cul_scope_0.mjs";export const revenue_ = ({ price_in }) => {
  return units({}) * price({ price_in });
};

// variable costs only, OK for testing
export const costs_ = ({}) => 100 * units({});

export const profit_ = ({ price_in }) => revenue({ price_in }) - costs({});

// inputs
export const units_ = ({}) => 100; // test a constant
export const price_ = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?