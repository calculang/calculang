import memoize from 'lru-memoize';
import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import {
  revenue_ as revenue$,
  units_1_ as units_1$,
  price_1_ as price_1$,
  units_ as units$,
  price_ as price$,
  price_multiplier_ as price_multiplier$,
  step_ as step$,
} from './price-change-reconciliation.cul.js?+memoed&cul_scope_id=1&cul_parent_scope_id=0'; ////////// start revenue memo-loader code //////////

const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue = (a) => {
  return revenue$m(a);
  revenue$({}); // never run, but here to "trick" calculang graph logic
}; ////////// end revenue memo-loader code //////////
////////// start units_1 memo-loader code //////////

const units_1$m = memoize(999999, isEqual)(units_1$);
export const units_1 = (a) => {
  return units_1$m(a);
  units_1$({
    units_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end units_1 memo-loader code //////////
////////// start price_1 memo-loader code //////////

const price_1$m = memoize(999999, isEqual)(price_1$);
export const price_1 = (a) => {
  return price_1$m(a);
  price_1$({
    price_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end price_1 memo-loader code //////////
////////// start units memo-loader code //////////

const units$m = memoize(999999, isEqual)(units$);
export const units = (a) => {
  return units$m(a);
  units$({
    step_in,
    units_in,
    price_in,
    price_multiplier_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end units memo-loader code //////////
////////// start price memo-loader code //////////

const price$m = memoize(999999, isEqual)(price$);
export const price = (a) => {
  return price$m(a);
  price$({
    price_in,
    price_multiplier_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end price memo-loader code //////////
////////// start price_multiplier memo-loader code //////////

const price_multiplier$m = memoize(999999, isEqual)(price_multiplier$);
export const price_multiplier = (a) => {
  return price_multiplier$m(a);
  price_multiplier$({
    price_multiplier_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end price_multiplier memo-loader code //////////
////////// start step memo-loader code //////////

const step$m = memoize(999999, isEqual)(step$);
export const step = (a) => {
  return step$m(a);
  step$({
    step_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end step memo-loader code //////////
