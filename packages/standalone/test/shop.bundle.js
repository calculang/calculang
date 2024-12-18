
////////////// cul scope id 0 //////////



// shop model, formulae:
export const s0_sales$ = ({ units_in, sales_price_in }) => s0_units({ units_in }) * s0_sales_price({ sales_price_in });

export const s0_purchases$ = ({ units_in, purchase_price_in }) => s0_units({ units_in }) * s0_purchase_price({ purchase_price_in });

export const s0_profit$ = ({ units_in, sales_price_in, purchase_price_in, expenses_in }) => s0_sales({ units_in, sales_price_in }) - s0_purchases({ units_in, purchase_price_in }) - s0_expenses({ expenses_in });

// inputs:
export const s0_sales_price = ({ sales_price_in }) => sales_price_in;
export const s0_purchase_price = ({ purchase_price_in }) => purchase_price_in;
export const s0_units = ({ units_in }) => units_in; // 7 * 20000 - sales_price() * 20000;
export const s0_expenses = ({ expenses_in }) => expenses_in;


export const s0_sales$m = memoize(s0_sales$, ({units_in, sales_price_in}) => Object.values(({units_in, sales_price_in})).toString()); // DN moved memo_hash to be formulaname => hash function
export const s0_sales = ({units_in, sales_price_in}) => s0_sales$m({units_in, sales_price_in})

export const s0_purchases$m = memoize(s0_purchases$, ({units_in, purchase_price_in}) => Object.values(({units_in, purchase_price_in})).toString()); // DN moved memo_hash to be formulaname => hash function
export const s0_purchases = ({units_in, purchase_price_in}) => s0_purchases$m({units_in, purchase_price_in})

export const s0_profit$m = memoize(s0_profit$, ({units_in, sales_price_in, purchase_price_in, expenses_in}) => Object.values(({units_in, sales_price_in, purchase_price_in, expenses_in})).toString()); // DN moved memo_hash to be formulaname => hash function
export const s0_profit = ({units_in, sales_price_in, purchase_price_in, expenses_in}) => s0_profit$m({units_in, sales_price_in, purchase_price_in, expenses_in})
  // from https://cdn.jsdelivr.net/npm/underscore@1.13.6/underscore-esm.js

  // Memoize an expensive function by storing its results.
  function memoize(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = (hasher ? hasher.apply(this, arguments) : key); // DN removed forced string coersion, undo?
      if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }

  // Internal function to check whether `key` is an own property name of `obj`.
function has$1(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
}












////////// defaults (imports above tho): ////

export const sales = s0_sales;
export const purchases = s0_purchases;
export const profit = s0_profit;
export const sales_price = s0_sales_price;
export const purchase_price = s0_purchase_price;
export const units = s0_units;
export const expenses = s0_expenses


