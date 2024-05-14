import { sales_price } from "./cul_scope_0.mjs";import { rating } from "./cul_scope_0.mjs";import { name } from "./cul_scope_0.mjs";import { item } from "./cul_scope_0.mjs";import { customer } from "./cul_scope_0.mjs";import { order } from "./cul_scope_0.mjs";
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

// import/export non-to memo?

import { table_ as table$, customer_ as customer$, customer_row_ as customer_row$, name_ as name$, rating_ as rating$ } from "./cul_scope_7.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!





////////// start table memo-loader code //////////
//const table$m = memoize(999999, isEqual)(table$);
export const table$m = memoize(table$, JSON.stringify);
export const table = (a) => {
  return table$m(a);
  // eslint-disable-next-line no-undef
  table$({}); // never run, but here to "trick" calculang graph logic
};
////////// end table memo-loader code //////////



////////// start customer memo-loader code //////////
//const customer$m = memoize(999999, isEqual)(customer$);
export const customer$m = memoize(customer$, JSON.stringify);
export const customer_ = (a) => {
  return customer$m(a);
  // eslint-disable-next-line no-undef
  customer$({ customer_in }); // never run, but here to "trick" calculang graph logic
};
////////// end customer memo-loader code //////////



////////// start customer_row memo-loader code //////////
//const customer_row$m = memoize(999999, isEqual)(customer_row$);
export const customer_row$m = memoize(customer_row$, JSON.stringify);
export const customer_row = (a) => {
  return customer_row$m(a);
  // eslint-disable-next-line no-undef
  customer_row$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end customer_row memo-loader code //////////



////////// start name memo-loader code //////////
//const name$m = memoize(999999, isEqual)(name$);
export const name$m = memoize(name$, JSON.stringify);
export const name_ = (a) => {
  return name$m(a);
  // eslint-disable-next-line no-undef
  name$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end name memo-loader code //////////



////////// start rating memo-loader code //////////
//const rating$m = memoize(999999, isEqual)(rating$);
export const rating$m = memoize(rating$, JSON.stringify);
export const rating_ = (a) => {
  return rating$m(a);
  // eslint-disable-next-line no-undef
  rating$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end rating memo-loader code //////////