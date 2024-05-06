
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    // import/export non-to memo?

    import { A_revenue_ as A_revenue$, A_profit_ as A_profit$, A_costs_ as A_costs$, A_units_ as A_units$, A_price_ as A_price$, B_revenue_ as B_revenue$, B_profit_ as B_profit$, B_costs_ as B_costs$, B_units_ as B_units$, B_price_ as B_price$, revenue_impact_ as revenue_impact$, profit_impact_ as profit_impact$, costs_impact_ as costs_impact$, units_impact_ as units_impact$, price_impact_ as price_impact$ } from './impactsAB-nomemo.cul.js?+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!

    
    
    

////////// start A_revenue memo-loader code //////////
//const A_revenue$m = memoize(999999, isEqual)(A_revenue$);
export const A_revenue$m = memoize(A_revenue$, JSON.stringify);
export const A_revenue = (a) => {
  return A_revenue$m(a);
  // eslint-disable-next-line no-undef
  A_revenue$(); // never run, but here to "trick" calculang graph logic
};
////////// end A_revenue memo-loader code //////////



////////// start A_profit memo-loader code //////////
//const A_profit$m = memoize(999999, isEqual)(A_profit$);
export const A_profit$m = memoize(A_profit$, JSON.stringify);
export const A_profit = (a) => {
  return A_profit$m(a);
  // eslint-disable-next-line no-undef
  A_profit$(); // never run, but here to "trick" calculang graph logic
};
////////// end A_profit memo-loader code //////////



////////// start A_costs memo-loader code //////////
//const A_costs$m = memoize(999999, isEqual)(A_costs$);
export const A_costs$m = memoize(A_costs$, JSON.stringify);
export const A_costs = (a) => {
  return A_costs$m(a);
  // eslint-disable-next-line no-undef
  A_costs$(); // never run, but here to "trick" calculang graph logic
};
////////// end A_costs memo-loader code //////////



////////// start A_units memo-loader code //////////
//const A_units$m = memoize(999999, isEqual)(A_units$);
export const A_units$m = memoize(A_units$, JSON.stringify);
export const A_units = (a) => {
  return A_units$m(a);
  // eslint-disable-next-line no-undef
  A_units$(); // never run, but here to "trick" calculang graph logic
};
////////// end A_units memo-loader code //////////



////////// start A_price memo-loader code //////////
//const A_price$m = memoize(999999, isEqual)(A_price$);
export const A_price$m = memoize(A_price$, JSON.stringify);
export const A_price = (a) => {
  return A_price$m(a);
  // eslint-disable-next-line no-undef
  A_price$(); // never run, but here to "trick" calculang graph logic
};
////////// end A_price memo-loader code //////////



////////// start B_revenue memo-loader code //////////
//const B_revenue$m = memoize(999999, isEqual)(B_revenue$);
export const B_revenue$m = memoize(B_revenue$, JSON.stringify);
export const B_revenue = (a) => {
  return B_revenue$m(a);
  // eslint-disable-next-line no-undef
  B_revenue$(); // never run, but here to "trick" calculang graph logic
};
////////// end B_revenue memo-loader code //////////



////////// start B_profit memo-loader code //////////
//const B_profit$m = memoize(999999, isEqual)(B_profit$);
export const B_profit$m = memoize(B_profit$, JSON.stringify);
export const B_profit = (a) => {
  return B_profit$m(a);
  // eslint-disable-next-line no-undef
  B_profit$(); // never run, but here to "trick" calculang graph logic
};
////////// end B_profit memo-loader code //////////



////////// start B_costs memo-loader code //////////
//const B_costs$m = memoize(999999, isEqual)(B_costs$);
export const B_costs$m = memoize(B_costs$, JSON.stringify);
export const B_costs = (a) => {
  return B_costs$m(a);
  // eslint-disable-next-line no-undef
  B_costs$(); // never run, but here to "trick" calculang graph logic
};
////////// end B_costs memo-loader code //////////



////////// start B_units memo-loader code //////////
//const B_units$m = memoize(999999, isEqual)(B_units$);
export const B_units$m = memoize(B_units$, JSON.stringify);
export const B_units = (a) => {
  return B_units$m(a);
  // eslint-disable-next-line no-undef
  B_units$(); // never run, but here to "trick" calculang graph logic
};
////////// end B_units memo-loader code //////////



////////// start B_price memo-loader code //////////
//const B_price$m = memoize(999999, isEqual)(B_price$);
export const B_price$m = memoize(B_price$, JSON.stringify);
export const B_price = (a) => {
  return B_price$m(a);
  // eslint-disable-next-line no-undef
  B_price$(); // never run, but here to "trick" calculang graph logic
};
////////// end B_price memo-loader code //////////



////////// start revenue_impact memo-loader code //////////
//const revenue_impact$m = memoize(999999, isEqual)(revenue_impact$);
export const revenue_impact$m = memoize(revenue_impact$, JSON.stringify);
export const revenue_impact = (a) => {
  return revenue_impact$m(a);
  // eslint-disable-next-line no-undef
  revenue_impact$(); // never run, but here to "trick" calculang graph logic
};
////////// end revenue_impact memo-loader code //////////



////////// start profit_impact memo-loader code //////////
//const profit_impact$m = memoize(999999, isEqual)(profit_impact$);
export const profit_impact$m = memoize(profit_impact$, JSON.stringify);
export const profit_impact = (a) => {
  return profit_impact$m(a);
  // eslint-disable-next-line no-undef
  profit_impact$(); // never run, but here to "trick" calculang graph logic
};
////////// end profit_impact memo-loader code //////////



////////// start costs_impact memo-loader code //////////
//const costs_impact$m = memoize(999999, isEqual)(costs_impact$);
export const costs_impact$m = memoize(costs_impact$, JSON.stringify);
export const costs_impact = (a) => {
  return costs_impact$m(a);
  // eslint-disable-next-line no-undef
  costs_impact$(); // never run, but here to "trick" calculang graph logic
};
////////// end costs_impact memo-loader code //////////



////////// start units_impact memo-loader code //////////
//const units_impact$m = memoize(999999, isEqual)(units_impact$);
export const units_impact$m = memoize(units_impact$, JSON.stringify);
export const units_impact = (a) => {
  return units_impact$m(a);
  // eslint-disable-next-line no-undef
  units_impact$(); // never run, but here to "trick" calculang graph logic
};
////////// end units_impact memo-loader code //////////



////////// start price_impact memo-loader code //////////
//const price_impact$m = memoize(999999, isEqual)(price_impact$);
export const price_impact$m = memoize(price_impact$, JSON.stringify);
export const price_impact = (a) => {
  return price_impact$m(a);
  // eslint-disable-next-line no-undef
  price_impact$(); // never run, but here to "trick" calculang graph logic
};
////////// end price_impact memo-loader code //////////


    