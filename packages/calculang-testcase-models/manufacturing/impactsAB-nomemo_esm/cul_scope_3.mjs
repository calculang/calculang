import { price } from "./cul_scope_1.mjs";import { units } from "./cul_scope_1.mjs";import { price_impact } from "./cul_scope_0.mjs";import { units_impact } from "./cul_scope_0.mjs";import { costs_impact } from "./cul_scope_0.mjs";import { profit_impact } from "./cul_scope_0.mjs";import { revenue_impact } from "./cul_scope_0.mjs";import { B_price } from "./cul_scope_2.mjs";import { B_units } from "./cul_scope_2.mjs";import { B_costs } from "./cul_scope_2.mjs";import { B_profit } from "./cul_scope_2.mjs";import { B_revenue } from "./cul_scope_2.mjs";export const revenue = ({}) => {
  return units({}) * price({});
};

// variable costs only, OK for testing
export const costs = ({}) => 100 * units({});

export const profit = ({}) => revenue({}) - costs({});

// inputs
export const units_ = ({ units_in }) => units_in;
export const price_ = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?