export const sales_by_product = () => (product() == 1 ? 100 : 50);
export const product = () => product_in;
export const sales_total = () =>
  sales_by_product({ product_in: 0 }) + sales_by_product({}); // => sales_total not fully independent of product_in
