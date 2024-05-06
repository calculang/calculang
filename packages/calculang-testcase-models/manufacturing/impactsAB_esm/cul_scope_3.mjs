import { price_impact } from "./cul_scope_0.mjs";import { units_impact } from "./cul_scope_0.mjs";import { costs_impact } from "./cul_scope_0.mjs";import { profit_impact } from "./cul_scope_0.mjs";import { revenue_impact } from "./cul_scope_0.mjs";import { B_price } from "./cul_scope_0.mjs";import { B_units } from "./cul_scope_0.mjs";import { B_costs } from "./cul_scope_0.mjs";import { B_profit } from "./cul_scope_0.mjs";import { B_revenue } from "./cul_scope_0.mjs";import { A_price } from "./cul_scope_0.mjs";import { A_units } from "./cul_scope_0.mjs";import { A_costs } from "./cul_scope_0.mjs";import { A_profit } from "./cul_scope_0.mjs";import { A_revenue } from "./cul_scope_0.mjs";
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

// import/export non-to memo?

import { revenue_ as revenue$, profit_ as profit$, costs_ as costs$, units_1_ as units_1$, price_1_ as price_1$, units_ as units$, price_ as price$, price_multiplier_ as price_multiplier$, step_ as step$ } from "./cul_scope_7.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!





////////// start revenue memo-loader code //////////
//const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue$m = memoize(revenue$, JSON.stringify);
export const revenue = (a) => {
  return revenue$m(a);
  // eslint-disable-next-line no-undef
  revenue$({ step_in, units_in, price_in, price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end revenue memo-loader code //////////



////////// start profit memo-loader code //////////
//const profit$m = memoize(999999, isEqual)(profit$);
export const profit$m = memoize(profit$, JSON.stringify);
export const profit = (a) => {
  return profit$m(a);
  // eslint-disable-next-line no-undef
  profit$({ step_in, units_in, price_in, price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end profit memo-loader code //////////



////////// start costs memo-loader code //////////
//const costs$m = memoize(999999, isEqual)(costs$);
export const costs$m = memoize(costs$, JSON.stringify);
export const costs = (a) => {
  return costs$m(a);
  // eslint-disable-next-line no-undef
  costs$({ step_in, units_in, price_in, price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end costs memo-loader code //////////



////////// start units_1 memo-loader code //////////
//const units_1$m = memoize(999999, isEqual)(units_1$);
export const units_1$m = memoize(units_1$, JSON.stringify);
export const units_1 = (a) => {
  return units_1$m(a);
  // eslint-disable-next-line no-undef
  units_1$({ units_in }); // never run, but here to "trick" calculang graph logic
};
////////// end units_1 memo-loader code //////////



////////// start price_1 memo-loader code //////////
//const price_1$m = memoize(999999, isEqual)(price_1$);
export const price_1$m = memoize(price_1$, JSON.stringify);
export const price_1 = (a) => {
  return price_1$m(a);
  // eslint-disable-next-line no-undef
  price_1$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end price_1 memo-loader code //////////



////////// start units memo-loader code //////////
//const units$m = memoize(999999, isEqual)(units$);
export const units$m = memoize(units$, JSON.stringify);
export const units = (a) => {
  return units$m(a);
  // eslint-disable-next-line no-undef
  units$({ step_in, units_in, price_in, price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end units memo-loader code //////////



////////// start price memo-loader code //////////
//const price$m = memoize(999999, isEqual)(price$);
export const price$m = memoize(price$, JSON.stringify);
export const price = (a) => {
  return price$m(a);
  // eslint-disable-next-line no-undef
  price$({ price_in, price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end price memo-loader code //////////



////////// start price_multiplier memo-loader code //////////
//const price_multiplier$m = memoize(999999, isEqual)(price_multiplier$);
export const price_multiplier$m = memoize(price_multiplier$, JSON.stringify);
export const price_multiplier = (a) => {
  return price_multiplier$m(a);
  // eslint-disable-next-line no-undef
  price_multiplier$({ price_multiplier_in }); // never run, but here to "trick" calculang graph logic
};
////////// end price_multiplier memo-loader code //////////



////////// start step memo-loader code //////////
//const step$m = memoize(999999, isEqual)(step$);
export const step$m = memoize(step$, JSON.stringify);
export const step = (a) => {
  return step$m(a);
  // eslint-disable-next-line no-undef
  step$({ step_in }); // never run, but here to "trick" calculang graph logic
};
////////// end step memo-loader code //////////