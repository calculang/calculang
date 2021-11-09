import { step_ } from './price-change-reconciliation.cul.js?+memoed&cul_scope_id=1&cul_parent_scope_id=0';
import { price_multiplier_ } from './price-change-reconciliation.cul.js?+memoed&cul_scope_id=1&cul_parent_scope_id=0';
import { step } from './price-change-reconciliation.cul.js';
import { price_multiplier } from './price-change-reconciliation.cul.js';
import { price } from './price-change-reconciliation.cul.js';
import { units } from './price-change-reconciliation.cul.js';
import { price_1 } from './price-change-reconciliation.cul.js';
import { units_1 } from './price-change-reconciliation.cul.js';
import memoize from 'lru-memoize';
import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import {
  revenue_ as revenue$,
  costs_ as costs$,
  profit_ as profit$,
  units_ as units$,
  price_ as price$,
} from './base.cul.js?&&+memoed&cul_scope_id=3&cul_parent_scope_id=2'; ////////// start revenue memo-loader code //////////

const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue = (a) => {
  // not renamed
  return revenue$m(a);
  revenue$({
    step_in,
    units_in,
    price_in,
    price_multiplier_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end revenue memo-loader code //////////
////////// start costs memo-loader code //////////

const costs$m = memoize(999999, isEqual)(costs$);
export const costs = (a) => {
  return costs$m(a);
  costs$({
    step_in,
    units_in,
    price_in,
    price_multiplier_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end costs memo-loader code //////////
////////// start profit memo-loader code //////////

const profit$m = memoize(999999, isEqual)(profit$);
export const profit = (a) => {
  return profit$m(a);
  profit$({
    step_in,
    units_in,
    price_in,
    price_multiplier_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end profit memo-loader code //////////
////////// start units memo-loader code //////////

const units$m = memoize(999999, isEqual)(units$);
export const units_ = (a) => {
  return units$m(a);
  units$({
    units_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end units memo-loader code //////////
////////// start price memo-loader code //////////

const price$m = memoize(999999, isEqual)(price$);
export const price_ = (a) => {
  return price$m(a);
  price$({
    price_in,
  }); // never run, but here to "trick" calculang graph logic
}; ////////// end price memo-loader code //////////
