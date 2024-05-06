import { step } from "./cul_scope_2.mjs";import { price_multiplier } from "./cul_scope_2.mjs";import { price } from "./cul_scope_2.mjs";import { units } from "./cul_scope_2.mjs";import { price_impact } from "./cul_scope_0.mjs";import { units_impact } from "./cul_scope_0.mjs";import { costs_impact } from "./cul_scope_0.mjs";import { profit_impact } from "./cul_scope_0.mjs";import { revenue_impact } from "./cul_scope_0.mjs";import { A_price } from "./cul_scope_1.mjs";import { A_units } from "./cul_scope_1.mjs";import { A_costs } from "./cul_scope_1.mjs";import { A_profit } from "./cul_scope_1.mjs";import { A_revenue } from "./cul_scope_1.mjs";export const revenue = ({ step_in, units_in, price_in, price_multiplier_in }) => {
  return units({ step_in, units_in, price_in, price_multiplier_in }) * price({ price_in, price_multiplier_in });
};

// variable costs only, OK for testing
export const costs = ({ step_in, units_in, price_in, price_multiplier_in }) => 100 * units({ step_in, units_in, price_in, price_multiplier_in });

export const profit = ({ step_in, units_in, price_in, price_multiplier_in }) => revenue({ step_in, units_in, price_in, price_multiplier_in }) - costs({ step_in, units_in, price_in, price_multiplier_in });

// inputs
export const units_ = ({ units_in }) => units_in;
export const price_ = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?