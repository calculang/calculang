import { revenue, profit, costs } from './base.cul';
export { revenue, profit, costs };

export const units = () => 100;
export const price = () => 500;

// this fixes (or constrains) the 2 inputs in base, so that this model is independent of inputs
// e.g. revenue() and profit() can be called without inputs and the values specified above are used
