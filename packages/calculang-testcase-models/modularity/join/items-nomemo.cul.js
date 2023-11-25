export const table = () => [
  { item: 1, sales_price: 1000 },
  { item: 2, sales_price: 1500 },
];

export const item = () => item_in;
export const item_row = () => table().find(d => d.item == item())
export const sales_price = () => item_row().sales_price;
