import { num } from "./cul_scope_0.mjs";
import { memoize } from 'underscore';
//import memoize from 'lru-memoize';
//import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { num_ as num$ } from "./cul_scope_7.mjs"; // there is already-culed stuff in here, why? imports to memo loader include cul_scope_id, what logic should it apply RE passing forward? eliminate? Probably!



////////// start num memo-loader code //////////
//const num$m = memoize(999999, isEqual)(num$);
export const num$m = memoize(num$, JSON.stringify);
export const num_ = (a) => {
  return num$m(a);
  // eslint-disable-next-line no-undef
  num$({}); // never run, but here to "trick" calculang graph logic
};
////////// end num memo-loader code //////////