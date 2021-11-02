// this is also the only test which uses JS from npm:
import memoize from 'lru-memoize';
import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?

import { units_, revenue_, price_ } from './base.cul';

// Javascript
const revenue_m = memoize(999999, isEqual)(revenue_);

// calculang
export const revenue = (a) => {
  return revenue_m(a);
  revenue_(); // never run, but here to "trick" calculang graph logic
};

// note: this pattern is included in testing because this logic
// may be used behind the scenes, e.g. for issue #1 (memoization loader)
// This is not something I consider a good modelling pattern!
