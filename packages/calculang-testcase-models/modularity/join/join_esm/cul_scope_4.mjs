import { sales_price } from "./cul_scope_0.mjs";import { rating } from "./cul_scope_0.mjs";import { name } from "./cul_scope_0.mjs";import { item } from "./cul_scope_0.mjs";import { customer } from "./cul_scope_0.mjs";import { order } from "./cul_scope_0.mjs";
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

// import/export non-to memo?

import { table_ as table$, item_ as item$, item_row_ as item_row$, sales_price_ as sales_price$ } from "./cul_scope_6.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!





////////// start table memo-loader code //////////
//const table$m = memoize(999999, isEqual)(table$);
export const table$m = memoize(table$, JSON.stringify);
export const table = (a) => {
  return table$m(a);
  // eslint-disable-next-line no-undef
  table$({}); // never run, but here to "trick" calculang graph logic
};
////////// end table memo-loader code //////////



////////// start item memo-loader code //////////
//const item$m = memoize(999999, isEqual)(item$);
export const item$m = memoize(item$, JSON.stringify);
export const item_ = (a) => {
  return item$m(a);
  // eslint-disable-next-line no-undef
  item$({ item_in }); // never run, but here to "trick" calculang graph logic
};
////////// end item memo-loader code //////////



////////// start item_row memo-loader code //////////
//const item_row$m = memoize(999999, isEqual)(item_row$);
export const item_row$m = memoize(item_row$, JSON.stringify);
export const item_row = (a) => {
  return item_row$m(a);
  // eslint-disable-next-line no-undef
  item_row$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end item_row memo-loader code //////////



////////// start sales_price memo-loader code //////////
//const sales_price$m = memoize(999999, isEqual)(sales_price$);
export const sales_price$m = memoize(sales_price$, JSON.stringify);
export const sales_price_ = (a) => {
  return sales_price$m(a);
  // eslint-disable-next-line no-undef
  sales_price$({ order_in }); // never run, but here to "trick" calculang graph logic
};
////////// end sales_price memo-loader code //////////