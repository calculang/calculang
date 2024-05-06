

import { revenue as A_revenue, profit as A_profit, costs as A_costs, units as A_units, price as A_price } from "./cul_scope_1.mjs"; // model A
import { revenue as B_revenue, profit as B_profit, costs as B_costs, units as B_units, price as B_price } from "./cul_scope_2.mjs"; // model B // sometimes B goes through cul loader before A!

export { A_revenue, A_profit, A_costs, A_units, A_price, B_revenue, B_profit, B_costs, B_units, B_price }; // should fail without this, but doesn't? : => internally everything effectively exported by webpack (maybe just b/c module concatenation plugin)

export const revenue_impact = ({ step_in, units_in, price_in, price_multiplier_in }) => A_revenue({}) - B_revenue({ step_in, units_in, price_in, price_multiplier_in }); // todo units, price, or maybe generate via impacts loader
export const profit_impact = ({}) => A_profit({}) - B_profit({});
export const costs_impact = ({}) => A_costs({}) - B_costs({});
export const units_impact = ({ step_in, units_in, price_in, price_multiplier_in }) => A_units({}) - B_units({ step_in, units_in, price_in, price_multiplier_in });
export const price_impact = ({ price_in, price_multiplier_in }) => A_price({}) - B_price({ price_in, price_multiplier_in });

// because concatenation module doesn't use the 'as' part, it does some of its own renaming instead