import { price } from "./cul_scope_2.mjs";import { units } from "./cul_scope_2.mjs";import { costs } from "./cul_scope_2.mjs";import { profit } from "./cul_scope_2.mjs";import { revenue } from "./cul_scope_2.mjs";import { price_impact } from "./cul_scope_0.mjs";import { units_impact } from "./cul_scope_0.mjs";import { costs_impact } from "./cul_scope_0.mjs";import { profit_impact } from "./cul_scope_0.mjs";import { revenue_impact } from "./cul_scope_0.mjs";import { B_price } from "./cul_scope_0.mjs";import { B_units } from "./cul_scope_0.mjs";import { B_costs } from "./cul_scope_0.mjs";import { B_profit } from "./cul_scope_0.mjs";import { B_revenue } from "./cul_scope_0.mjs";import { A_price } from "./cul_scope_0.mjs";import { A_units } from "./cul_scope_0.mjs";import { A_costs } from "./cul_scope_0.mjs";import { A_profit } from "./cul_scope_0.mjs";import { A_revenue } from "./cul_scope_0.mjs";import { revenue_, profit_, costs_ } from "./cul_scope_5.mjs";
export { revenue_, profit_, costs_ };

export const units_ = ({}) => 100;
export const price_ = ({}) => 500;

// this fixes (or constrains) the 2 inputs in base, so that this model is independent of inputs
// e.g. revenue() and profit() can be called without inputs and the values specified above are used