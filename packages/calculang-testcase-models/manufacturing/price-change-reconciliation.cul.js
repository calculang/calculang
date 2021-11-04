// this model takes inputs base price and units, and a price_multiplier.
// it derives a proposed price by applying the multiplier and derives consequent units, constrained to the demand curve below.

// via an additional input step_in it provides a mini reconciliation (if you can call it that) feature, moving units from the amount reflecting the update to the demand curve (when step_in is 0)
// back to the base unit value (when step_in is 1) i.e. giving the results without the demand curve impact.

// both revenue and units are impacted by the step input (and profit, and any other units-dependent functions throughout the complete model: this works no matter how complicated the base model)

// 'mini' is because price is already updated throughout the steps - step is really just acting like a switch here.
// A real reconciliation should move through all the inputs, and should be structured more logically (as in a model-of- a more general model, separated), but this is just for testing

// this tests some key language features of calculang and demos their technical motivations

import { revenue, units_, price_ } from './base.cul';
export { revenue, units_, price_ };

// import { all } from './base.cul.js'; TODO use this in place of above when I fix issue #13
// export { all };

export const units = () =>
  step() >= 1 ? units_() + (price() - price_()) * -0.005 : units_();
export const price = () => price_() * price_multiplier();

// new inputs
export const price_multiplier = () => price_multiplier_in;
export const step = () => step_in;
