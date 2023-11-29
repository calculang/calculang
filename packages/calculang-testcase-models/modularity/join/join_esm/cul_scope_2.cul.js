
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { table_ as table$, order_ as order$, order_row_ as order_row$, customer_ as customer$, item_ as item$ } from './orders.cul.js?&+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!
    
    

////////// start table memo-loader code //////////
//const table$m = memoize(999999, isEqual)(table$);
export const table$m = memoize(table$, JSON.stringify);
export const table = (a) => {
  return table$m(a);
  // eslint-disable-next-line no-undef
  table$(); // never run, but here to "trick" calculang graph logic
};
////////// end table memo-loader code //////////



////////// start order memo-loader code //////////
//const order$m = memoize(999999, isEqual)(order$);
export const order$m = memoize(order$, JSON.stringify);
export const order = (a) => {
  return order$m(a);
  // eslint-disable-next-line no-undef
  order$(); // never run, but here to "trick" calculang graph logic
};
////////// end order memo-loader code //////////



////////// start order_row memo-loader code //////////
//const order_row$m = memoize(999999, isEqual)(order_row$);
export const order_row$m = memoize(order_row$, JSON.stringify);
export const order_row = (a) => {
  return order_row$m(a);
  // eslint-disable-next-line no-undef
  order_row$(); // never run, but here to "trick" calculang graph logic
};
////////// end order_row memo-loader code //////////



////////// start customer memo-loader code //////////
//const customer$m = memoize(999999, isEqual)(customer$);
export const customer$m = memoize(customer$, JSON.stringify);
export const customer = (a) => {
  return customer$m(a);
  // eslint-disable-next-line no-undef
  customer$(); // never run, but here to "trick" calculang graph logic
};
////////// end customer memo-loader code //////////



////////// start item memo-loader code //////////
//const item$m = memoize(999999, isEqual)(item$);
export const item$m = memoize(item$, JSON.stringify);
export const item = (a) => {
  return item$m(a);
  // eslint-disable-next-line no-undef
  item$(); // never run, but here to "trick" calculang graph logic
};
////////// end item memo-loader code //////////


    