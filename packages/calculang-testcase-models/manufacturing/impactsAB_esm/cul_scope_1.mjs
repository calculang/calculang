import { price_impact } from "./cul_scope_0.mjs";import { units_impact } from "./cul_scope_0.mjs";import { costs_impact } from "./cul_scope_0.mjs";import { profit_impact } from "./cul_scope_0.mjs";import { revenue_impact } from "./cul_scope_0.mjs";import { B_price } from "./cul_scope_0.mjs";import { B_units } from "./cul_scope_0.mjs";import { B_costs } from "./cul_scope_0.mjs";import { B_profit } from "./cul_scope_0.mjs";import { B_revenue } from "./cul_scope_0.mjs";import { A_price } from "./cul_scope_0.mjs";import { A_units } from "./cul_scope_0.mjs";import { A_costs } from "./cul_scope_0.mjs";import { A_profit } from "./cul_scope_0.mjs";import { A_revenue } from "./cul_scope_0.mjs";

import { revenue as A_revenue_, profit as A_profit_, costs as A_costs_, units as A_units_, price as A_price_ } from "./cul_scope_2.mjs"; // model A
import { revenue as B_revenue_, profit as B_profit_, costs as B_costs_, units as B_units_, price as B_price_ } from "./cul_scope_3.mjs"; // model B // sometimes B goes through cul loader before A!

export { A_revenue_, A_profit_, A_costs_, A_units_, A_price_, B_revenue_, B_profit_, B_costs_, B_units_, B_price_ }; // should fail without this, but doesn't? : => internally everything effectively exported by webpack (maybe just b/c module concatenation plugin)

export const revenue_impact_ = ({ step_in, units_in, price_in, price_multiplier_in }) => A_revenue({}) - B_revenue({ step_in, units_in, price_in, price_multiplier_in }); // todo units, price, or maybe generate via impacts loader
export const profit_impact_ = ({ step_in, units_in, price_in, price_multiplier_in }) => A_profit({}) - B_profit({ step_in, units_in, price_in, price_multiplier_in });
export const costs_impact_ = ({}) => A_costs({}) - B_costs({});
export const units_impact_ = ({ step_in, units_in, price_in, price_multiplier_in }) => A_units({}) - B_units({ step_in, units_in, price_in, price_multiplier_in });
export const price_impact_ = ({ price_in, price_multiplier_in }) => A_price({}) - B_price({ price_in, price_multiplier_in });

// because concatenation module doesn't use the 'as' part, it does some of its own renaming instead