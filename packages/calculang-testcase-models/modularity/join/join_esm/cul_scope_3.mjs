import { rating } from "./cul_scope_2.mjs";import { name } from "./cul_scope_2.mjs";import { item } from "./cul_scope_1.mjs";import { customer } from "./cul_scope_1.mjs";import { order } from "./cul_scope_1.mjs";export const table = ({}) => [
{ item: 1, sales_price: 1000 },
{ item: 2, sales_price: 1500 }];


export const item_ = ({ item_in }) => item_in;
export const item_row = ({ order_in }) => table({}).find((d) => d.item == item({ order_in }));
export const sales_price = ({ order_in }) => item_row({ order_in }).sales_price;