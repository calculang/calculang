import { item_row } from "./cul_scope_4.mjs";import { table } from "./cul_scope_4.mjs";import { sales_price } from "./cul_scope_0.mjs";import { rating } from "./cul_scope_0.mjs";import { name } from "./cul_scope_0.mjs";import { item } from "./cul_scope_0.mjs";import { customer } from "./cul_scope_0.mjs";import { order } from "./cul_scope_0.mjs";export const table_ = ({}) => [
{ item: 1, sales_price: 1000 },
{ item: 2, sales_price: 1500 }];


export const item_ = ({ item_in }) => item_in;
export const item_row_ = ({ order_in }) => table({}).find((d) => d.item == item({ order_in }));
export const sales_price_ = ({ order_in }) => item_row({ order_in }).sales_price;