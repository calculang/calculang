import { price } from "./cul_scope_2.mjs";import { units } from "./cul_scope_2.mjs";import { revenue } from "./cul_scope_2.mjs";import { revenue_impact } from "./cul_scope_0.mjs";import { B_revenue } from "./cul_scope_0.mjs";import { A_revenue } from "./cul_scope_0.mjs";
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { B_revenue_ as B_revenue$, revenue_impact_ as revenue_impact$, units_ as units$, price_ as price$, revenue_ as revenue$, costs_ as costs$, profit_ as profit$ } from "./cul_scope_6.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!



////////// start B_revenue memo-loader code //////////
//const B_revenue$m = memoize(999999, isEqual)(B_revenue$);
export const B_revenue$m = memoize(B_revenue$, JSON.stringify);
export const B_revenue_ = (a) => {
  return B_revenue$m(a);
  // eslint-disable-next-line no-undef
  B_revenue$({}); // never run, but here to "trick" calculang graph logic
};
////////// end B_revenue memo-loader code //////////



////////// start revenue_impact memo-loader code //////////
//const revenue_impact$m = memoize(999999, isEqual)(revenue_impact$);
export const revenue_impact$m = memoize(revenue_impact$, JSON.stringify);
export const revenue_impact_ = (a) => {
  return revenue_impact$m(a);
  // eslint-disable-next-line no-undef
  revenue_impact$({}); // never run, but here to "trick" calculang graph logic
};
////////// end revenue_impact memo-loader code //////////



////////// start units memo-loader code //////////
//const units$m = memoize(999999, isEqual)(units$);
export const units$m = memoize(units$, JSON.stringify);
export const units_ = (a) => {
  return units$m(a);
  // eslint-disable-next-line no-undef
  units$({ units_in }); // never run, but here to "trick" calculang graph logic
};
////////// end units memo-loader code //////////



////////// start price memo-loader code //////////
//const price$m = memoize(999999, isEqual)(price$);
export const price$m = memoize(price$, JSON.stringify);
export const price_ = (a) => {
  return price$m(a);
  // eslint-disable-next-line no-undef
  price$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end price memo-loader code //////////



////////// start revenue memo-loader code //////////
//const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue$m = memoize(revenue$, JSON.stringify);
export const revenue_ = (a) => {
  return revenue$m(a);
  // eslint-disable-next-line no-undef
  revenue$({}); // never run, but here to "trick" calculang graph logic
};
////////// end revenue memo-loader code //////////



////////// start costs memo-loader code //////////
//const costs$m = memoize(999999, isEqual)(costs$);
export const costs$m = memoize(costs$, JSON.stringify);
export const costs = (a) => {
  return costs$m(a);
  // eslint-disable-next-line no-undef
  costs$({}); // never run, but here to "trick" calculang graph logic
};
////////// end costs memo-loader code //////////



////////// start profit memo-loader code //////////
//const profit$m = memoize(999999, isEqual)(profit$);
export const profit$m = memoize(profit$, JSON.stringify);
export const profit = (a) => {
  return profit$m(a);
  // eslint-disable-next-line no-undef
  profit$({}); // never run, but here to "trick" calculang graph logic
};
////////// end profit memo-loader code //////////