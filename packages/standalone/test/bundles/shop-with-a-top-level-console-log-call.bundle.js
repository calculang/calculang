let model = {}; 



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

export const sales = s0_sales; model['sales'] = sales;
export const purchases = s0_purchases; model['purchases'] = purchases;
export const profit = s0_profit; model['profit'] = profit;
export const sales_price = s0_sales_price; model['sales_price'] = sales_price;
export const purchase_price = s0_purchase_price; model['purchase_price'] = purchase_price;
export const units = s0_units; model['units'] = units;
export const expenses = s0_expenses; model['expenses'] = expenses


model['s0_sales'] = s0_sales;
model['s0_purchases'] = s0_purchases;
model['s0_profit'] = s0_profit;
model['s0_sales_price'] = s0_sales_price;
model['s0_purchase_price'] = s0_purchase_price;
model['s0_units'] = s0_units;
model['s0_expenses'] = s0_expenses;

