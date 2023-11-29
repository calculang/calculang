
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { table_ as table$, customer_row_ as customer_row$, name_ as name$, rating_ as rating$ } from './customers.cul.js?&+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!
    
    

////////// start table memo-loader code //////////
//const table$m = memoize(999999, isEqual)(table$);
export const table$m = memoize(table$, JSON.stringify);
export const table = (a) => {
  return table$m(a);
  // eslint-disable-next-line no-undef
  table$(); // never run, but here to "trick" calculang graph logic
};
////////// end table memo-loader code //////////



////////// start customer_row memo-loader code //////////
//const customer_row$m = memoize(999999, isEqual)(customer_row$);
export const customer_row$m = memoize(customer_row$, JSON.stringify);
export const customer_row = (a) => {
  return customer_row$m(a);
  // eslint-disable-next-line no-undef
  customer_row$(); // never run, but here to "trick" calculang graph logic
};
////////// end customer_row memo-loader code //////////



////////// start name memo-loader code //////////
//const name$m = memoize(999999, isEqual)(name$);
export const name$m = memoize(name$, JSON.stringify);
export const name = (a) => {
  return name$m(a);
  // eslint-disable-next-line no-undef
  name$(); // never run, but here to "trick" calculang graph logic
};
////////// end name memo-loader code //////////



////////// start rating memo-loader code //////////
//const rating$m = memoize(999999, isEqual)(rating$);
export const rating$m = memoize(rating$, JSON.stringify);
export const rating = (a) => {
  return rating$m(a);
  // eslint-disable-next-line no-undef
  rating$(); // never run, but here to "trick" calculang graph logic
};
////////// end rating memo-loader code //////////


    