
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { table_ as table$, item_row_ as item_row$, sales_price_ as sales_price$ } from './items.cul.js?&+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!
    
    

////////// start table memo-loader code //////////
//const table$m = memoize(999999, isEqual)(table$);
export const table$m = memoize(table$, JSON.stringify);
export const table = (a) => {
  return table$m(a);
  // eslint-disable-next-line no-undef
  table$(); // never run, but here to "trick" calculang graph logic
};
////////// end table memo-loader code //////////



////////// start item_row memo-loader code //////////
//const item_row$m = memoize(999999, isEqual)(item_row$);
export const item_row$m = memoize(item_row$, JSON.stringify);
export const item_row = (a) => {
  return item_row$m(a);
  // eslint-disable-next-line no-undef
  item_row$(); // never run, but here to "trick" calculang graph logic
};
////////// end item_row memo-loader code //////////



////////// start sales_price memo-loader code //////////
//const sales_price$m = memoize(999999, isEqual)(sales_price$);
export const sales_price$m = memoize(sales_price$, JSON.stringify);
export const sales_price = (a) => {
  return sales_price$m(a);
  // eslint-disable-next-line no-undef
  sales_price$(); // never run, but here to "trick" calculang graph logic
};
////////// end sales_price memo-loader code //////////


    