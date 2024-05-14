import { customer_row } from "./cul_scope_3.mjs";import { table } from "./cul_scope_3.mjs";import { sales_price } from "./cul_scope_0.mjs";import { rating } from "./cul_scope_0.mjs";import { name } from "./cul_scope_0.mjs";import { item } from "./cul_scope_0.mjs";import { customer } from "./cul_scope_0.mjs";import { order } from "./cul_scope_0.mjs";export const table_ = ({}) => [
{
  customer: 1, name: 'Adam', rating: 101 },
{ customer: 2, name: 'Eve', rating: 105 }];


export const customer_ = ({ customer_in }) => customer_in;
export const customer_row_ = ({ order_in }) => table({}).find((d) => d.customer == customer({ order_in }));
export const name_ = ({ order_in }) => customer_row({ order_in }).name;
export const rating_ = ({ order_in }) => customer_row({ order_in }).rating;