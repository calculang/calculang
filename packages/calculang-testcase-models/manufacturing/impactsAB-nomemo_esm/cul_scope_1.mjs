import { price_impact } from "./cul_scope_0.mjs";import { units_impact } from "./cul_scope_0.mjs";import { costs_impact } from "./cul_scope_0.mjs";import { profit_impact } from "./cul_scope_0.mjs";import { revenue_impact } from "./cul_scope_0.mjs";import { B_price } from "./cul_scope_2.mjs";import { B_units } from "./cul_scope_2.mjs";import { B_costs } from "./cul_scope_2.mjs";import { B_profit } from "./cul_scope_2.mjs";import { B_revenue } from "./cul_scope_2.mjs";import { revenue, profit, costs } from "./cul_scope_3.mjs";
export { revenue, profit, costs };

export const units = ({}) => 100;
export const price = ({}) => 500;

// this fixes (or constrains) the 2 inputs in base, so that this model is independent of inputs
// e.g. revenue() and profit() can be called without inputs and the values specified above are used