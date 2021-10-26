// this model takes input base price and units, and a price_multiplier.
// it derives a proposed price by applying the multiplier and derives consequent units, constrained by the demand curve below.

// via an additional input step_in it provides a mini reconciliation, moving units from the amount reflecting the update to the demand curve (when step_in is 0)
// back to the base unit value (when step_in is 1)

// both revenue and units are impacted by the step input (as well as any other potential units-dependent functions throughout this/higher-level models)

// 'mini' is because price is already updated throughout the steps.
// A real reconciliation should move through all the inputs.

// this demos some key language features of calculang and their technical motivations.

import { revenue, units_, price_ } from './base.cul';
export { revenue };

// import { all } from './base.cul.js'; TODO use this in place of above when I fix issue #13
// export { all };

export const units = () =>
  step() >= 1 ? units_() + (price() - price_()) * -0.005 : units_();
export const price = () => price_() * price_multiplier();

// new inputs
export const price_multiplier = () => price_multiplier_in;
export const step = () => step_in;
