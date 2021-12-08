import { revenue as A_revenue } from './revenue-fixed-inputs.cul.js'; // model A
import { revenue as B_revenue } from './price-change-reconciliation.cul.js'; // model B // sometimes B goes through cul loader before A!

export { A_revenue, B_revenue }; // should fail without this, but doesn't? : => internally everything effectively exported by webpack (maybe just b/c module concatenation plugin)

export const revenue_impact = () => A_revenue() - B_revenue(); // todo units, price, or maybe generate via impacts loader

// because concatenation module doesn't use the 'as' part, it does some of its own renaming instead
