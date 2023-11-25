// 'neg' logic is the most delicate of all the logic in calculang
// I had more testcases in development, and need to add more

export const sales_by_product = ({ product_in }) => product({ product_in }) == 1 ? 100 : 50;
export const product = ({ product_in }) => product_in;
export const sales_total = ({ product_in }) =>
sales_by_product({ product_in: 0 }) + sales_by_product({ product_in }); // => sales_total NOT independent of product_in (this is coded to add some products sales to product 0 sales : bad, but legit from calculang perspective)