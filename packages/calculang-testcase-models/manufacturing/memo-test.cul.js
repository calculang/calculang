// this is also the only test which uses JS from npm:
import memoize from 'lru-memoize';
import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import {
  units_ as units$,
  revenue_ as revenue$,
  price_ as price$,
  costs_ as costs$,
  profit_ as profit$,
} from './base.cul';

// Javascript
const revenue$m = memoize(999999, isEqual)(revenue$);
const price$m = memoize(999999, isEqual)(price$);
const units$m = memoize(999999, isEqual)(units$);
const costs$m = memoize(999999, isEqual)(costs$);
const profit$m = memoize(999999, isEqual)(profit$);

// calculang
export const revenue = (a) => {
  return revenue$m(a);
  revenue$(); // never run, but here to "trick" calculang graph logic
};
export const price = (a) => {
  return price$m(a);
  price$(); // never run, but here to "trick" calculang graph logic
};
export const units = (a) => {
  return units$m(a);
  units$(); // never run, but here to "trick" calculang graph logic
};
export const costs = (a) => {
  return costs$m(a);
  costs$(); // never run, but here to "trick" calculang graph logic
};
export const profit = (a) => {
  return profit$m(a);
  profit$(); // never run, but here to "trick" calculang graph logic
};

// note: this pattern is included in testing because this logic
// may be used behind the scenes, e.g. for issue #1 (memoization loader)
// This is not something I consider a good modelling pattern!
