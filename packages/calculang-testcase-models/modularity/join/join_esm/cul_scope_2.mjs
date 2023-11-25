import { sales_price } from "./cul_scope_3.mjs";import { item } from "./cul_scope_1.mjs";import { customer } from "./cul_scope_1.mjs";import { order } from "./cul_scope_1.mjs";export const table = ({}) => [
{
  customer: 1, name: 'Adam', rating: 101 },
{ customer: 2, name: 'Eve', rating: 105 }];


export const customer_ = ({ customer_in }) => customer_in;
export const customer_row = ({ order_in }) => table({}).find((d) => d.customer == customer({ order_in }));
export const name = ({ order_in }) => customer_row({ order_in }).name;
export const rating = ({ order_in }) => customer_row({ order_in }).rating;