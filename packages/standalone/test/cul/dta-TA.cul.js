// no overrides so could equally import from .js in this case

import { balance } from "https://calculang.dev/models/simple-loan/simple-loan.cul.js"

// duration (in years):
export const duration = () => Math.floor(duration_mth() / 12);

export const duration_mth = () => duration_mth_in + t();

export const t = () => t_in
export const policy_term = () => policy_term_in
export const sum_assured = () => sum_assured_in

export const dta_factor = () => balance({ year_in: duration(), principal_in: 1, d_i_year_in: 0, i_in:.10, d_i_in:0, missed_repayment_year_in:-1, skip_interest_in:0, term_in:policy_term() })

export const claim_pp = () => sum_assured() * dta_factor()
