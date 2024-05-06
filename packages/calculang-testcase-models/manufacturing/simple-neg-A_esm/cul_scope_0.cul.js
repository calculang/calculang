
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    // import/export non-to memo?

    import { sales_by_product_ as sales_by_product$, product_ as product$, sales_total_ as sales_total$ } from './simple-neg-A.cul.js?+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!

    
    
    

////////// start sales_by_product memo-loader code //////////
//const sales_by_product$m = memoize(999999, isEqual)(sales_by_product$);
export const sales_by_product$m = memoize(sales_by_product$, JSON.stringify);
export const sales_by_product = (a) => {
  return sales_by_product$m(a);
  // eslint-disable-next-line no-undef
  sales_by_product$(); // never run, but here to "trick" calculang graph logic
};
////////// end sales_by_product memo-loader code //////////



////////// start product memo-loader code //////////
//const product$m = memoize(999999, isEqual)(product$);
export const product$m = memoize(product$, JSON.stringify);
export const product = (a) => {
  return product$m(a);
  // eslint-disable-next-line no-undef
  product$(); // never run, but here to "trick" calculang graph logic
};
////////// end product memo-loader code //////////



////////// start sales_total memo-loader code //////////
//const sales_total$m = memoize(999999, isEqual)(sales_total$);
export const sales_total$m = memoize(sales_total$, JSON.stringify);
export const sales_total = (a) => {
  return sales_total$m(a);
  // eslint-disable-next-line no-undef
  sales_total$(); // never run, but here to "trick" calculang graph logic
};
////////// end sales_total memo-loader code //////////


    