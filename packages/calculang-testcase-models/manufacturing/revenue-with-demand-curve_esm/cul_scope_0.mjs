
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { revenue_ as revenue$, price_ as price$, units_ as units$ } from "./cul_scope_1.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!



////////// start revenue memo-loader code //////////
//const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue$m = memoize(revenue$, JSON.stringify);
export const revenue = (a) => {
  return revenue$m(a);
  // eslint-disable-next-line no-undef
  revenue$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end revenue memo-loader code //////////



////////// start price memo-loader code //////////
//const price$m = memoize(999999, isEqual)(price$);
export const price$m = memoize(price$, JSON.stringify);
export const price = (a) => {
  return price$m(a);
  // eslint-disable-next-line no-undef
  price$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end price memo-loader code //////////



////////// start units memo-loader code //////////
//const units$m = memoize(999999, isEqual)(units$);
export const units$m = memoize(units$, JSON.stringify);
export const units = (a) => {
  return units$m(a);
  // eslint-disable-next-line no-undef
  units$({ price_in }); // never run, but here to "trick" calculang graph logic
};
////////// end units memo-loader code //////////