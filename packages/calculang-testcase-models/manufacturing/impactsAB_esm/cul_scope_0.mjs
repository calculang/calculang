import { revenue as A_revenue } from "./cul_scope_1.mjs"; // model A
import { revenue as B_revenue } from "./cul_scope_2.mjs"; // model B // sometimes B goes through cul loader before A!

export { A_revenue, B_revenue }; // should fail without this, but doesn't? : => internally everything effectively exported by webpack (maybe just b/c module concatenation plugin)

export const revenue_impact = ({ step_in, units_in, price_in, price_multiplier_in }) => A_revenue({}) - B_revenue({ step_in, units_in, price_in, price_multiplier_in }); // todo units, price, or maybe generate via impacts loader

// because concatenation module doesn't use the 'as' part, it does some of its own renaming instead