import { units } from "./cul_scope_0.mjs";import { profit } from "./cul_scope_0.mjs";import { price } from "./cul_scope_0.mjs";import { revenue } from "./cul_scope_0.mjs";
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { units_ as units$, revenue_ as revenue$, costs_ as costs$, profit_ as profit$, price_ as price$ } from "./cul_scope_3.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!



////////// start units memo-loader code //////////
//const units$m = memoize(999999, isEqual)(units$);
export const units$m = memoize(units$, JSON.stringify);
export const units_ = (a) => {
  return units$m(a);
  // eslint-disable-next-line no-undef
  units$({ units_in }); // never run, but here to "trick" calculang graph logic
};
////////// end units memo-loader code //////////



////////// start revenue memo-loader code //////////
//const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue$m = memoize(revenue$, JSON.stringify);
export const revenue_ = (a) => {
  return revenue$m(a);
  // eslint-disable-next-line no-undef
  revenue$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end revenue memo-loader code //////////



////////// start costs memo-loader code //////////
//const costs$m = memoize(999999, isEqual)(costs$);
export const costs$m = memoize(costs$, JSON.stringify);
export const costs = (a) => {
  return costs$m(a);
  // eslint-disable-next-line no-undef
  costs$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end costs memo-loader code //////////



////////// start profit memo-loader code //////////
//const profit$m = memoize(999999, isEqual)(profit$);
export const profit$m = memoize(profit$, JSON.stringify);
export const profit_ = (a) => {
  return profit$m(a);
  // eslint-disable-next-line no-undef
  profit$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end profit memo-loader code //////////



////////// start price memo-loader code //////////
//const price$m = memoize(999999, isEqual)(price$);
export const price$m = memoize(price$, JSON.stringify);
export const price_ = (a) => {
  return price$m(a);
  // eslint-disable-next-line no-undef
  price$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end price memo-loader code //////////