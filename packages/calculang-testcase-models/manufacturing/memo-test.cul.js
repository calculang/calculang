// this is also the only test which uses JS from npm:
import memoize from 'lru-memoize';
import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { units_, revenue_, price_, costs_, profit_ } from './base.cul';

// Javascript
const revenue_m = memoize(999999, isEqual)(revenue_);
const price_m = memoize(999999, isEqual)(price_);
const units_m = memoize(999999, isEqual)(units_);
const costs_m = memoize(999999, isEqual)(costs_);
const profit_m = memoize(999999, isEqual)(profit_);

// calculang
export const revenue = (a) => {
  return revenue_m(a);
  revenue_(); // never run, but here to "trick" calculang graph logic
};
export const price = (a) => {
  return price_m(a);
  price_(); // never run, but here to "trick" calculang graph logic
};
export const units = (a) => {
  return units_m(a);
  units_(); // never run, but here to "trick" calculang graph logic
};
export const costs = (a) => {
  return costs_m(a);
  costs_(); // never run, but here to "trick" calculang graph logic
};
export const profit = (a) => {
  return profit_m(a);
  profit_(); // never run, but here to "trick" calculang graph logic
};

// note: this pattern is included in testing because this logic
// may be used behind the scenes, e.g. for issue #1 (memoization loader)
// This is not something I consider a good modelling pattern!
