
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { A_revenue_ as A_revenue$, revenue_impact_ as revenue_impact$, units_ as units$, price_ as price$, price_multiplier_ as price_multiplier$, step_ as step$, revenue_ as revenue$, costs_ as costs$, profit_ as profit$ } from './base.cul.js?&+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!
    
    

////////// start A_revenue memo-loader code //////////
//const A_revenue$m = memoize(999999, isEqual)(A_revenue$);
export const A_revenue$m = memoize(A_revenue$, JSON.stringify);
export const A_revenue = (a) => {
  return A_revenue$m(a);
  // eslint-disable-next-line no-undef
  A_revenue$(); // never run, but here to "trick" calculang graph logic
};
////////// end A_revenue memo-loader code //////////



////////// start revenue_impact memo-loader code //////////
//const revenue_impact$m = memoize(999999, isEqual)(revenue_impact$);
export const revenue_impact$m = memoize(revenue_impact$, JSON.stringify);
export const revenue_impact = (a) => {
  return revenue_impact$m(a);
  // eslint-disable-next-line no-undef
  revenue_impact$(); // never run, but here to "trick" calculang graph logic
};
////////// end revenue_impact memo-loader code //////////



////////// start units memo-loader code //////////
//const units$m = memoize(999999, isEqual)(units$);
export const units$m = memoize(units$, JSON.stringify);
export const units = (a) => {
  return units$m(a);
  // eslint-disable-next-line no-undef
  units$(); // never run, but here to "trick" calculang graph logic
};
////////// end units memo-loader code //////////



////////// start price memo-loader code //////////
//const price$m = memoize(999999, isEqual)(price$);
export const price$m = memoize(price$, JSON.stringify);
export const price = (a) => {
  return price$m(a);
  // eslint-disable-next-line no-undef
  price$(); // never run, but here to "trick" calculang graph logic
};
////////// end price memo-loader code //////////



////////// start price_multiplier memo-loader code //////////
//const price_multiplier$m = memoize(999999, isEqual)(price_multiplier$);
export const price_multiplier$m = memoize(price_multiplier$, JSON.stringify);
export const price_multiplier = (a) => {
  return price_multiplier$m(a);
  // eslint-disable-next-line no-undef
  price_multiplier$(); // never run, but here to "trick" calculang graph logic
};
////////// end price_multiplier memo-loader code //////////



////////// start step memo-loader code //////////
//const step$m = memoize(999999, isEqual)(step$);
export const step$m = memoize(step$, JSON.stringify);
export const step = (a) => {
  return step$m(a);
  // eslint-disable-next-line no-undef
  step$(); // never run, but here to "trick" calculang graph logic
};
////////// end step memo-loader code //////////



////////// start revenue memo-loader code //////////
//const revenue$m = memoize(999999, isEqual)(revenue$);
export const revenue$m = memoize(revenue$, JSON.stringify);
export const revenue = (a) => {
  return revenue$m(a);
  // eslint-disable-next-line no-undef
  revenue$(); // never run, but here to "trick" calculang graph logic
};
////////// end revenue memo-loader code //////////



////////// start costs memo-loader code //////////
//const costs$m = memoize(999999, isEqual)(costs$);
export const costs$m = memoize(costs$, JSON.stringify);
export const costs = (a) => {
  return costs$m(a);
  // eslint-disable-next-line no-undef
  costs$(); // never run, but here to "trick" calculang graph logic
};
////////// end costs memo-loader code //////////



////////// start profit memo-loader code //////////
//const profit$m = memoize(999999, isEqual)(profit$);
export const profit$m = memoize(profit$, JSON.stringify);
export const profit = (a) => {
  return profit$m(a);
  // eslint-disable-next-line no-undef
  profit$(); // never run, but here to "trick" calculang graph logic
};
////////// end profit memo-loader code //////////


    