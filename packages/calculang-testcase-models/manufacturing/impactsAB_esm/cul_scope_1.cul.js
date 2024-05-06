

import { revenue as A_revenue, profit as A_profit, costs as A_costs, units as A_units, price as A_price } from './revenue-fixed-inputs.cul.js'; // model A
import { revenue as B_revenue, profit as B_profit, costs as B_costs, units as B_units, price as B_price } from './price-change-reconciliation.cul.js'; // model B // sometimes B goes through cul loader before A!

export { A_revenue, A_profit, A_costs, A_units, A_price, B_revenue, B_profit, B_costs, B_units, B_price }; // should fail without this, but doesn't? : => internally everything effectively exported by webpack (maybe just b/c module concatenation plugin)

export const revenue_impact = () => A_revenue() - B_revenue(); // todo units, price, or maybe generate via impacts loader
export const profit_impact = () => A_profit() - B_profit();
export const costs_impact = () => A_costs() - B_costs();
export const units_impact = () => A_units() - B_units();
export const price_impact = () => A_price() - B_price();

// because concatenation module doesn't use the 'as' part, it does some of its own renaming instead
