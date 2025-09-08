
// shop model, formulae:
export const sales = () => units() * sales_price();

export const purchases = () => units() * purchase_price();

export const profit = () => sales() - purchases() - expenses();

// inputs:
export const sales_price = () => sales_price_in;
export const purchase_price = () => purchase_price_in;
export const units = () => units_in; // 7 * 20000 - sales_price() * 20000;
export const expenses = () => expenses_in;

console.log(sales({units_in: 10, sales_price:10})) // <-- TESTING THIS - this works because of s0_; calling sales directly fails because sales = s0_sales definition it BELOW this in bundle