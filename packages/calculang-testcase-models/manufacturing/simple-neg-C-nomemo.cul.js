// 'neg' logic is the most delicate of all the logic in calculang
// I had more testcases in development, and need to add more

export const sales_by_product = () => (product() == 1 ? 100 : 50);
export const product = () => product_in;
export const sales_total = () =>
  [0, 1].reduce((acc, product_in) => sales_by_product()); // product_in is defined in each call, so that sales_total IS independent of product_in
