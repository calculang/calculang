import { profit } from './s2.js'; //'./base.cul?cul_scope_id=2&cul_parent_scope_id=1';
import { costs } from './s2.js'; //'./base.cul?cul_scope_id=2&cul_parent_scope_id=1';
import { revenue } from './s2.js'; //'./base.cul?cul_scope_id=2&cul_parent_scope_id=1';
import { step_ } from './s1.js'; //'./price-change-reconciliation.cul.js?+memoed&cul_scope_id=1&cul_parent_scope_id=0';
import { price_multiplier_ } from './s1.js'; // './price-change-reconciliation.cul.js?+memoed&cul_scope_id=1&cul_parent_scope_id=0';
import { step } from './s0.js'; //'./price-change-reconciliation.cul.js';
import { price_multiplier } from './s0.js'; //'./price-change-reconciliation.cul.js';
import { price } from './s0.js'; //'./price-change-reconciliation.cul.js';
import { units } from './s0.js'; //'./price-change-reconciliation.cul.js';
import { price_1 } from './s0.js'; //'./price-change-reconciliation.cul.js';
import { units_1 } from './s0.js'; // './price-change-reconciliation.cul.js';

export const revenue_ = ({
  step_in,
  units_in,
  price_in,
  price_multiplier_in,
}) => {
  return (
    units({
      step_in,
      units_in,
      price_in,
      price_multiplier_in,
    }) *
    price({
      price_in,
      price_multiplier_in,
    })
  );
}; // variable costs only, OK for testing

export const costs_ = ({ step_in, units_in, price_in, price_multiplier_in }) =>
  100 *
  units({
    step_in,
    units_in,
    price_in,
    price_multiplier_in,
  });
export const profit_ = ({ step_in, units_in, price_in, price_multiplier_in }) =>
  revenue({
    step_in,
    units_in,
    price_in,
    price_multiplier_in,
  }) -
  costs({
    step_in,
    units_in,
    price_in,
    price_multiplier_in,
  }); // inputs

export const units_ = ({ units_in }) => units_in;
export const price_ = ({ price_in }) => price_in; // ?? what if an explicit import in base referred back to A or B?
