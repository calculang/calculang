
    import { memoize } from 'underscore';
    //import memoize from 'lru-memoize';
    //import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    // import/export non-to memo?

    import { num__ as num_$ } from './one.cul.js?&+memoed'; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!

    
    
    

////////// start num_ memo-loader code //////////
//const num_$m = memoize(999999, isEqual)(num_$);
export const num_$m = memoize(num_$, JSON.stringify);
export const num_ = (a) => {
  return num_$m(a);
  // eslint-disable-next-line no-undef
  num_$(); // never run, but here to "trick" calculang graph logic
};
////////// end num_ memo-loader code //////////


    