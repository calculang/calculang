import { profit } from "./cul_scope_0.mjs";import { costs } from "./cul_scope_0.mjs";import { units } from "./cul_scope_0.mjs";import { price } from "./cul_scope_0.mjs";import { revenue } from "./cul_scope_0.mjs"; // this is also the only test which uses JS from npm:
import memoize from 'lru-memoize';
import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import {
units_ as units$,
revenue_ as revenue$,
price_ as price$,
costs_ as costs$,
profit_ as profit$ } from
"./cul_scope_2.mjs";

// Javascript
const revenue$m = memoize(999999, isEqual)(revenue$);
const price$m = memoize(999999, isEqual)(price$);
const units$m = memoize(999999, isEqual)(units$);
const costs$m = memoize(999999, isEqual)(costs$);
const profit$m = memoize(999999, isEqual)(profit$);

// calculang
export const revenue_ = (a) => {
  return revenue$m(a);
  revenue$({ units_in, price_in }); // never run, but here to "trick" calculang graph logic
};
export const price_ = (a) => {
  return price$m(a);
  price$({ price_in }); // never run, but here to "trick" calculang graph logic
};
export const units_ = (a) => {
  return units$m(a);
  units$({ units_in }); // never run, but here to "trick" calculang graph logic
};
export const costs_ = (a) => {
  return costs$m(a);
  costs$({ units_in }); // never run, but here to "trick" calculang graph logic
};
export const profit_ = (a) => {
  return profit$m(a);
  profit$({ units_in, price_in }); // never run, but here to "trick" calculang graph logic
};

// note: this pattern is included in testing because this logic
// may be used behind the scenes, e.g. for issue #1 (memoization loader)
// This is not something I consider a good modelling pattern!