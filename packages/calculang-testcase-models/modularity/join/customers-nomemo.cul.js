export const table = () => [
  {
    customer: 1, name: 'Adam', rating: 101 },
  { customer: 2, name: 'Eve', rating: 105 },
];

export const customer = () => customer_in;
export const customer_row = () => table().find(d => d.customer == customer())
export const name = () => customer_row().name;
export const rating = () => customer_row().rating;
