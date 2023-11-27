
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { A_revenue_ as A_revenue$, B_revenue_ as B_revenue$, revenue_impact_ as revenue_impact$ } from "./cul_scope_1.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!



////////// start A_revenue memo-loader code //////////
//const A_revenue$m = memoize(999999, isEqual)(A_revenue$);
export const A_revenue$m = memoize(A_revenue$, JSON.stringify);
export const A_revenue = (a) => {
  return A_revenue$m(a);
  // eslint-disable-next-line no-undef
  A_revenue$({}); // never run, but here to "trick" calculang graph logic
};
////////// end A_revenue memo-loader code //////////



////////// start B_revenue memo-loader code //////////
//const B_revenue$m = memoize(999999, isEqual)(B_revenue$);
export const B_revenue$m = memoize(B_revenue$, JSON.stringify);
export const B_revenue = (a) => {
  return B_revenue$m(a);
  // eslint-disable-next-line no-undef
  B_revenue$({ step_in, units_in, price_in, price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end B_revenue memo-loader code //////////



////////// start revenue_impact memo-loader code //////////
//const revenue_impact$m = memoize(999999, isEqual)(revenue_impact$);
export const revenue_impact$m = memoize(revenue_impact$, JSON.stringify);
export const revenue_impact = (a) => {
  return revenue_impact$m(a);
  // eslint-disable-next-line no-undef
  revenue_impact$({ step_in, units_in, price_in, price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end revenue_impact memo-loader code //////////