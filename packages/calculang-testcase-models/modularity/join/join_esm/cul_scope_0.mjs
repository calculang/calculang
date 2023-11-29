
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { order_ as order$, customer_ as customer$, item_ as item$, name_ as name$, rating_ as rating$, sales_price_ as sales_price$ } from "./cul_scope_1.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!



////////// start order memo-loader code //////////
//const order$m = memoize(999999, isEqual)(order$);
export const order$m = memoize(order$, JSON.stringify);
export const order = (a) => {
  return order$m(a);
  // eslint-disable-next-line no-undef
  order$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end order memo-loader code //////////



////////// start customer memo-loader code //////////
//const customer$m = memoize(999999, isEqual)(customer$);
export const customer$m = memoize(customer$, JSON.stringify);
export const customer = (a) => {
  return customer$m(a);
  // eslint-disable-next-line no-undef
  customer$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end customer memo-loader code //////////



////////// start item memo-loader code //////////
//const item$m = memoize(999999, isEqual)(item$);
export const item$m = memoize(item$, JSON.stringify);
export const item = (a) => {
  return item$m(a);
  // eslint-disable-next-line no-undef
  item$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end item memo-loader code //////////



////////// start name memo-loader code //////////
//const name$m = memoize(999999, isEqual)(name$);
export const name$m = memoize(name$, JSON.stringify);
export const name = (a) => {
  return name$m(a);
  // eslint-disable-next-line no-undef
  name$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end name memo-loader code //////////



////////// start rating memo-loader code //////////
//const rating$m = memoize(999999, isEqual)(rating$);
export const rating$m = memoize(rating$, JSON.stringify);
export const rating = (a) => {
  return rating$m(a);
  // eslint-disable-next-line no-undef
  rating$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end rating memo-loader code //////////



////////// start sales_price memo-loader code //////////
//const sales_price$m = memoize(999999, isEqual)(sales_price$);
export const sales_price$m = memoize(sales_price$, JSON.stringify);
export const sales_price = (a) => {
  return sales_price$m(a);
  // eslint-disable-next-line no-undef
  sales_price$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end sales_price memo-loader code //////////