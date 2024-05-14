import { revenue, price, profit } from './base.cul';
export { revenue, price, profit };

// demand-curve constraint:
export const units = () => 1000 - 200 * price();

// this model has a constraint on units so that price is the only model input, and units are derived from the price input
