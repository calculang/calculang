export const table = () => [
  { order: 1, customer: 1, item: 'A' },
  { order: 2, customer: 1, item: 'B' },
  { order: 3, customer: 2, item: 'B' },
];

export const order = () => order_in;
export const order_row = () => table().find(d => d.order == order())
export const customer = () => order_row().customer;
export const item = () => order_row().item;
