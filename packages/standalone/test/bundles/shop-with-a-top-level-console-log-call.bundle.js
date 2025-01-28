
////////////// cul scope id 0 //////////



// shop model, formulae:
export const s0_sales = ({ units_in, sales_price_in }) => s0_units({ units_in }) * s0_sales_price({ sales_price_in });

export const s0_purchases = ({ units_in, purchase_price_in }) => s0_units({ units_in }) * s0_purchase_price({ purchase_price_in });

export const s0_profit = ({ units_in, sales_price_in, purchase_price_in, expenses_in }) => s0_sales({ units_in, sales_price_in }) - s0_purchases({ units_in, purchase_price_in }) - s0_expenses({ expenses_in });

// inputs:
export const s0_sales_price = ({ sales_price_in }) => sales_price_in;
export const s0_purchase_price = ({ purchase_price_in }) => purchase_price_in;
export const s0_units = ({ units_in }) => units_in; // 7 * 20000 - sales_price() * 20000;
export const s0_expenses = ({ expenses_in }) => expenses_in;

console.log(s0_sales({ units_in: 10, sales_price_in: 10 })); // <-- TESTING THIS












////////// defaults (imports above tho): ////

export const sales = s0_sales;
export const purchases = s0_purchases;
export const profit = s0_profit;
export const sales_price = s0_sales_price;
export const purchase_price = s0_purchase_price;
export const units = s0_units;
export const expenses = s0_expenses


