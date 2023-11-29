import { order_row } from "./cul_scope_2.mjs";import { table } from "./cul_scope_2.mjs";import { sales_price } from "./cul_scope_0.mjs";import { rating } from "./cul_scope_0.mjs";import { name } from "./cul_scope_0.mjs";import { item } from "./cul_scope_0.mjs";import { customer } from "./cul_scope_0.mjs";import { order } from "./cul_scope_0.mjs";export const table_ = ({}) => [
{ order: 1, customer: 1, item: 'A' },
{ order: 2, customer: 1, item: 'B' },
{ order: 3, customer: 2, item: 'B' }];


export const order_ = ({ order_in }) => order_in;
export const order_row_ = ({ order_in }) => table({}).find((d) => d.order == order({ order_in }));
export const customer_ = ({ order_in }) => order_row({ order_in }).customer;
export const item_ = ({ order_in }) => order_row({ order_in }).item;