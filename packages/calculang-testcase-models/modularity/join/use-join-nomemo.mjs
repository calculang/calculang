import { rating } from "./join_esm/cul_scope_0.mjs";
import _ from 'underscore';

console.table([1,2,3].map((d) => rating({ order_in: d })));
