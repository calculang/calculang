import { sales_price } from "./cul_scope_3.mjs";import { rating } from "./cul_scope_2.mjs";import { name } from "./cul_scope_2.mjs";export const table = ({}) => [
{ order: 1, customer: 1, item: 'A' },
{ order: 2, customer: 1, item: 'B' },
{ order: 3, customer: 2, item: 'B' }];


export const order = ({ order_in }) => order_in;
export const order_row = ({ order_in }) => table({}).find((d) => d.order == order({ order_in }));
export const customer = ({ order_in }) => order_row({ order_in }).customer;
export const item = ({ order_in }) => order_row({ order_in }).item;