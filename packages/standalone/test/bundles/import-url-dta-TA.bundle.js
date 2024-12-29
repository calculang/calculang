
////////////// cul scope id 0 //////////


export const s0_sum_assured = ({}) => 60_000;



////////////// cul scope id 1 //////////

// no overrides so could equally import from .js in this case



// duration (in years):
export const s1_duration = ({ duration_mth_in, t_in }) => Math.floor(s1_duration_mth({ duration_mth_in, t_in }) / 12);
export const s1_duration_mth = ({ duration_mth_in, t_in }) => duration_mth_in + s1_t({ t_in });
export const s1_t = ({ t_in }) => t_in;
export const s1_policy_term = ({ policy_term_in }) => policy_term_in;
export const s1_sum_assured_ = ({ sum_assured_in }) => sum_assured_in;
export const s1_dta_factor = ({ duration_mth_in, t_in, policy_term_in }) => s2_balance({
  year_in: s1_duration({ duration_mth_in, t_in }),
  principal_in: 1,
  d_i_year_in: 0,
  i_in: .10,
  d_i_in: 0,
  missed_repayment_year_in: -1,
  skip_interest_in: 0,
  term_in: s1_policy_term({ policy_term_in }) }
);
export const s1_claim_pp = ({ duration_mth_in, t_in, policy_term_in }) => s0_sum_assured({}) * s1_dta_factor({ duration_mth_in, t_in, policy_term_in });



////////////// cul scope id 2 //////////

export const s2_v = ({ year_in, d_i_year_in, i_in, d_i_in }) => 1 / (1 + s2_interest_rate({ year_in, d_i_year_in, i_in, d_i_in }));
export const s2_v_pow_term_left = ({ year_in, d_i_year_in, i_in, d_i_in, term_in }) => Math.pow(s2_v({ year_in, d_i_year_in, i_in, d_i_in }), s2_term({ term_in }) - s2_year({ year_in }) + 1);

// this models automatic refinancing because there is no restriction to last financing, an updated calc is applied every year
export const s2_repayment_amount = ({ year_in, principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in }) => {
  if (Math.abs(s2_balance({ principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s2_year({ year_in }) - 1 }
  )) < 0.01) return 0;
  //if (term() == year()) edge case?
  if (s2_interest_rate({ year_in, d_i_year_in, i_in, d_i_in }) == 0) return s2_balance({ principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s2_year({ year_in }) - 1 }
  ) / (s2_term({ term_in }) - s2_year({ year_in }) + 1);else return s2_balance({ principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s2_year({ year_in }) - 1 }
  ) * s2_interest_rate({ year_in, d_i_year_in, i_in, d_i_in }) / (1 - s2_v_pow_term_left({ year_in, d_i_year_in, i_in, d_i_in, term_in }));
};

// interest charged to balance:
export const s2_interest = ({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, d_i_year_in, i_in, d_i_in }) => s2_balance({ principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in,
  year_in: s2_year({ year_in }) - 1 }
) * s2_interest_rate({ year_in, d_i_year_in, i_in, d_i_in });

// restrict cap repayment to repayment made.. (no, implied?)
export const s2_capital_repayment = ({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, d_i_year_in, i_in, d_i_in, term_in }) => {
  return Math.max(0, s2_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, d_i_year_in, i_in, d_i_in, term_in }) - s2_interest_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, d_i_year_in, i_in, d_i_in, term_in }));
};
export const s2_interest_repayment = ({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, d_i_year_in, i_in, d_i_in, term_in }) => Math.min(s2_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, d_i_year_in, i_in, d_i_in, term_in }), s2_interest({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, d_i_year_in, i_in, d_i_in }));

// year 0 the principal is received, first repayment is due year=1
export const s2_repayment_due = ({ year_in, term_in }) => s2_year({ year_in }) <= s2_term({ term_in }) && s2_year({ year_in }) != 0;
export const s2_repayment = ({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, d_i_year_in, i_in, d_i_in, term_in }) => {
  // I'm modelling a "missed repayment" as being either 0 (skip_interest is set) or =interest (an interest-only payment: capital part is 'missed')
  if (s2_year({ year_in }) == s2_missed_repayment_year({ missed_repayment_year_in })) {
    if (s2_skip_interest({ skip_interest_in })) return 0;else return s2_interest({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, d_i_year_in, i_in, d_i_in });
  } else return s2_repayment_due({ year_in, term_in }) * s2_repayment_amount({ year_in, principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in });
};
export const s2_balance = ({ year_in, principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in }) => {
  if (s2_year({ year_in }) < 0) return 0;
  if (s2_year({ year_in }) == 0) return s2_principal({ principal_in });else return s2_balance({ principal_in, d_i_year_in, i_in, d_i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s2_year({ year_in }) - 1 }
  ) + s2_interest({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, d_i_year_in, i_in, d_i_in }) - s2_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, d_i_year_in, i_in, d_i_in, term_in });
};

// changing interest rates are a modelling option, blend here and use above:
export const s2_interest_rate = ({ year_in, d_i_year_in, i_in, d_i_in }) => s2_year({ year_in }) >= s2_d_i_year({ d_i_year_in }) ? s2_i({ i_in }) + s2_d_i({ d_i_in }) : s2_i({ i_in });

// inputs:
export const s2_principal = ({ principal_in }) => principal_in;
export const s2_i = ({ i_in }) => i_in; // interest rate
export const s2_term = ({ term_in }) => term_in;
export const s2_year = ({ year_in }) => year_in;

// inputs for missed repayment option:
export const s2_missed_repayment_year = ({ missed_repayment_year_in }) => missed_repayment_year_in;
export const s2_skip_interest = ({ skip_interest_in }) => skip_interest_in;

// inputs for delta/changing interest rates:
export const s2_d_i_year = ({ d_i_year_in }) => d_i_year_in; // year the delta interest rate happens
export const s2_d_i = ({ d_i_in }) => d_i_in; // delta interest rate


export const s1_balance = s2_balance


export const balance = s1_balance;
export const duration = s1_duration;
export const duration_mth = s1_duration_mth;
export const t = s1_t;
export const policy_term = s1_policy_term;
export const dta_factor = s1_dta_factor;
export const claim_pp = s1_claim_pp






////////// defaults (imports above tho): ////

export const sum_assured = s0_sum_assured


