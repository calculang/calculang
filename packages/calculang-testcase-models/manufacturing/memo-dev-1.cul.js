// pulled from a debug session, this should compile nicely with memo off?

import memoize from 'lru-memoize';
import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import {
  revenue_ as revenue$,
  units__ as units_$, // base units, -> units_ and passed forward, but can't be! Should be poss?! Overriding a defn, using it, so implicit import shouldn't happen.
  price__ as price_$,
  units_ as units$, // reconciliation units, -> units and passed forward
  price_ as price$,
  price_multiplier_ as price_multiplier$,
  step_ as step$,
} from './price-change-reconciliation.cul.js?+memoed';

////////// start revenue memo-loader code //////////
const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue = (a) => {
  return revenue$m(a);
  revenue$(); // never run, but here to "trick" calculang graph logic
};
////////// end revenue memo-loader code //////////

////////// start units_ memo-loader code //////////
const units_$m = memoize(999999, isEqual)(units_$);
export const units_ = (a) => {
  return units_$m(a);
  units_$(); // never run, but here to "trick" calculang graph logic
};
////////// end units_ memo-loader code //////////

////////// start price_ memo-loader code //////////
const price_$m = memoize(999999, isEqual)(price_$);
export const price_ = (a) => {
  return price_$m(a);
  price_$(); // never run, but here to "trick" calculang graph logic
};
////////// end price_ memo-loader code //////////

////////// start units memo-loader code //////////
const units$m = memoize(999999, isEqual)(units$);
export const units = (a) => {
  return units$m(a);
  units$(); // never run, but here to "trick" calculang graph logic
};
////////// end units memo-loader code //////////

////////// start price memo-loader code //////////
const price$m = memoize(999999, isEqual)(price$);
export const price = (a) => {
  return price$m(a);
  price$(); // never run, but here to "trick" calculang graph logic
};
////////// end price memo-loader code //////////

////////// start price_multiplier memo-loader code //////////
const price_multiplier$m = memoize(999999, isEqual)(price_multiplier$);
export const price_multiplier = (a) => {
  return price_multiplier$m(a);
  price_multiplier$(); // never run, but here to "trick" calculang graph logic
};
////////// end price_multiplier memo-loader code //////////

////////// start step memo-loader code //////////
const step$m = memoize(999999, isEqual)(step$);
export const step = (a) => {
  return step$m(a);
  step$(); // never run, but here to "trick" calculang graph logic
};
////////// end step memo-loader code //////////
