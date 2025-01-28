import { all_cul, actual_interest_rates_ as actual_interest_rates_orig } from 'https://calculang.dev/models/savings/savings-rec.cul.js';

export const actual_interest_rates = () => actual_interest_rates_orig().map(d => d * .5);
