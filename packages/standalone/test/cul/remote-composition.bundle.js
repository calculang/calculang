
////////////// cul scope id 0 //////////



// if I use all_cul1 here I get a Babel parse error VarRedeclaration
//"https://calculang.dev/models/taxes-pensions/pension-calculator.cul.js"; // BUG TOFIX TODO I can't do ?v=x etc.

export const s0_balance = ({ year_in, principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in }) => {
  if (s1_year({ year_in }) == 5) return s1_balance_({ year_in, principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in }) + 100_000; // TODO check interest values?
  else return s1_balance_({ year_in, principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in });
};

// bypassing existing thing
export const s0_interest_rate = ({ year_in, i_in }) => {
  if (s1_year({ year_in }) < 8) return s1_i({ i_in });else return s1_i({ i_in }) + 0.1;
};
export const s0_empee_contribution = ({}) => 10_000;

// https://github.com/calculang/calculang/issues/158
export const s0_fund_value2 = ({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in, year_in }) => s2_fund_value({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in,
  age_in: s1_year({ year_in }) + s2_age_0({ age_0_in }) }
);
export const s0_empee_contribution_tax_relief2 = ({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in, year_in, age_0_in }) => s2_empee_contribution_tax_relief({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
  age_in: s1_year({ year_in }) + s2_age_0({ age_0_in }) }
);
export const s0_gross_salary = ({}) => 100_000;



////////////// cul scope id 1 //////////

export const s1_v = ({ year_in, i_in }) => 1 / (1 + s0_interest_rate({ year_in, i_in }));
export const s1_v_pow_term_left = ({ year_in, i_in, term_in }) => Math.pow(s1_v({ year_in, i_in }), s1_term({ term_in }) - s1_year({ year_in }) + 1);

// this models automatic refinancing because there is no restriction to last financing, an updated calc is applied every year
export const s1_repayment_amount = ({ year_in, principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in }) => {
  if (Math.abs(s0_balance({ principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s1_year({ year_in }) - 1 }
  )) < 0.01) return 0;
  //if (term() == year()) edge case?
  if (s0_interest_rate({ year_in, i_in }) == 0) return s0_balance({ principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s1_year({ year_in }) - 1 }
  ) / (s1_term({ term_in }) - s1_year({ year_in }) + 1);else return s0_balance({ principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s1_year({ year_in }) - 1 }
  ) * s0_interest_rate({ year_in, i_in }) / (1 - s1_v_pow_term_left({ year_in, i_in, term_in }));
};

// interest charged to balance:
export const s1_interest = ({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, i_in }) => s0_balance({ principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in,
  year_in: s1_year({ year_in }) - 1 }
) * s0_interest_rate({ year_in, i_in });

// restrict cap repayment to repayment made.. (no, implied?)
export const s1_capital_repayment = ({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, i_in, term_in }) => {
  return Math.max(0, s1_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, i_in, term_in }) - s1_interest_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, i_in, term_in }));
};
export const s1_interest_repayment = ({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, i_in, term_in }) => Math.min(s1_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, i_in, term_in }), s1_interest({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, i_in }));

// year 0 the principal is received, first repayment is due year=1
export const s1_repayment_due = ({ year_in, term_in }) => s1_year({ year_in }) <= s1_term({ term_in }) && s1_year({ year_in }) != 0;
export const s1_repayment = ({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, i_in, term_in }) => {
  // I'm modelling a "missed repayment" as being either 0 (skip_interest is set) or =interest (an interest-only payment: capital part is 'missed')
  if (s1_year({ year_in }) == s1_missed_repayment_year({ missed_repayment_year_in })) {
    if (s1_skip_interest({ skip_interest_in })) return 0;else return s1_interest({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, i_in });
  } else return s1_repayment_due({ year_in, term_in }) * s1_repayment_amount({ year_in, principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in });
};
export const s1_balance_ = ({ year_in, principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in }) => {
  if (s1_year({ year_in }) < 0) return 0;
  if (s1_year({ year_in }) == 0) return s1_principal({ principal_in });else return s0_balance({ principal_in, i_in, missed_repayment_year_in, skip_interest_in, term_in,
    year_in: s1_year({ year_in }) - 1 }
  ) + s1_interest({ year_in, principal_in, missed_repayment_year_in, skip_interest_in, term_in, i_in }) - s1_repayment({ year_in, missed_repayment_year_in, skip_interest_in, principal_in, i_in, term_in });
};

// changing interest rates are a modelling option, blend here and use above:
export const s1_interest_rate_ = ({ year_in, d_i_year_in, i_in, d_i_in }) => s1_year({ year_in }) >= s1_d_i_year({ d_i_year_in }) ? s1_i({ i_in }) + s1_d_i({ d_i_in }) : s1_i({ i_in });

// inputs:
export const s1_principal = ({ principal_in }) => principal_in;
export const s1_i = ({ i_in }) => i_in; // interest rate
export const s1_term = ({ term_in }) => term_in;
export const s1_year = ({ year_in }) => year_in;

// inputs for missed repayment option:
export const s1_missed_repayment_year = ({ missed_repayment_year_in }) => missed_repayment_year_in;
export const s1_skip_interest = ({ skip_interest_in }) => skip_interest_in;

// inputs for delta/changing interest rates:
export const s1_d_i_year = ({ d_i_year_in }) => d_i_year_in; // year the delta interest rate happens
export const s1_d_i = ({ d_i_in }) => d_i_in; // delta interest rate



////////////// cul scope id 2 //////////

// disclaimer: This is a work-in-progress model released for some calculang/tooling demonstration purposes and numbers shouldn't be relied upon; there are known model issues.



export const s2_fund_value = ({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) => s2_unit_balance({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) * s2_unit_price({ age_in, age_0_in, unit_growth_rate_in }); // not allowing for multiple funds now

export const s2_fund_growth = ({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) => s2_unit_balance({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in,
  age_in: s2_age({ age_in }) - 1 }
) * s2_unit_price({ age_in, age_0_in, unit_growth_rate_in }) - s2_unit_balance({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in,
  age_in: s2_age({ age_in }) - 1 }
) * s2_unit_price({ age_0_in, unit_growth_rate_in,
  age_in: s2_age({ age_in }) - 1 }
);
export const s2_fund_charges = ({ contribution_charge_rate_in, emper_matching_rate_in, age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, management_charge_rate_in }) => s2_contribution_charge({ contribution_charge_rate_in, emper_matching_rate_in }) + s2_management_charge({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in });
export const s2_contribution_charge = ({ contribution_charge_rate_in, emper_matching_rate_in }) => -s2_contribution_charge_rate({ contribution_charge_rate_in }) * (s0_empee_contribution({}) + s2_emper_contribution({ emper_matching_rate_in }));
export const s2_check_cfs = ({ paye_band_id_in, pension_contribution_in, age_in, usc_band_id_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in, emper_matching_rate_in, age_0_in, fund_value_0_in, unit_growth_rate_in, contribution_charge_rate_in, management_charge_rate_in }) => s2_empee_contribution_cost({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) + s2_empee_contribution_tax_relief({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) + s2_emper_contribution({ emper_matching_rate_in }) + s2_fund_growth({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) + s2_fund_charges({ contribution_charge_rate_in, emper_matching_rate_in, age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, management_charge_rate_in });
export const s2_check_cfs_vs_fund_value = ({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in, paye_band_id_in, pension_contribution_in, usc_band_id_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) => s2_fund_value({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) - s2_fund_value({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in,
  age_in: s2_age({ age_in }) - 1 }
) - s2_check_cfs({ paye_band_id_in, pension_contribution_in, age_in, usc_band_id_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in, emper_matching_rate_in, age_0_in, fund_value_0_in, unit_growth_rate_in, contribution_charge_rate_in, management_charge_rate_in });
export const s2_unit_balance = ({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) => {
  if (s2_age({ age_in }) <= s2_age_0({ age_0_in }) - 1) return s2_fund_value_0({ fund_value_0_in }) / s2_unit_price({ age_in, age_0_in, unit_growth_rate_in });else return s2_unit_balance({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ) + s2_contribution_units({ emper_matching_rate_in, contribution_charge_rate_in, age_in, age_0_in, unit_growth_rate_in }) + s2_management_charge_units({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in });
  // timing = premium received at start of year and allocated immediately
};
export const s2_management_charge_rate = ({ management_charge_rate_in }) => management_charge_rate_in;
export const s2_management_charge = ({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) => {
  if (s2_age({ age_in }) <= s2_age_0({ age_0_in })) return 0;else return -s2_fund_value({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ) * s2_management_charge_rate({ management_charge_rate_in });
};
export const s2_management_charge_units = ({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) => s2_management_charge({ age_in, age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in }) / s2_unit_price({ age_in, age_0_in, unit_growth_rate_in });
export const s2_contributions = ({ emper_matching_rate_in }) => s0_empee_contribution({}) + s2_emper_contribution({ emper_matching_rate_in });
export const s2_contribution_units = ({ emper_matching_rate_in, contribution_charge_rate_in, age_in, age_0_in, unit_growth_rate_in }) => s2_contributions({ emper_matching_rate_in }) * (1 - s2_contribution_charge_rate({ contribution_charge_rate_in })) / s2_unit_price({ age_in, age_0_in, unit_growth_rate_in }); // todo, AVCs?

export const s2_unit_price = ({ age_in, age_0_in, unit_growth_rate_in }) => {
  if (s2_age({ age_in }) <= s2_age_0({ age_0_in })) return 1;else return s2_unit_price({ age_0_in, unit_growth_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ) * (1 + s2_unit_growth_rate({ unit_growth_rate_in }));
};
export const s2_missed_contribution_age = ({ missed_contribution_age_in }) => missed_contribution_age_in != undefined ? missed_contribution_age_in : -1;
export const s2_empee_contribution_ = ({ age_in, age_0_in, retirement_age_in, missed_contribution_age_in, salary_age_0_in, salary_0_in, salary_inflation_rate_in, empee_contribution_rate_in }) => {
  if (s2_age({ age_in }) <= s2_age_0({ age_0_in }) - 1 || s2_age({ age_in }) == s2_retirement_age({ retirement_age_in }) || s2_age({ age_in }) == s2_missed_contribution_age({ missed_contribution_age_in })) return 0;else return s2_salary({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ) * s2_empee_contribution_rate({ empee_contribution_rate_in });
};
export const s2_accumulated_empee_contributions = ({ age_in, age_0_in }) => {
  if (s2_age({ age_in }) == s2_age_0({ age_0_in }) - 1) return 0;else return s2_accumulated_empee_contributions({ age_0_in,
    age_in: s2_age({ age_in }) - 1 }
  ) + s0_empee_contribution({});
};
export const s2_accumulated_empee_contribution_tax_relief = ({ age_in, age_0_in, paye_band_id_in, pension_contribution_in, usc_band_id_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) => {
  if (s2_age({ age_in }) == s2_age_0({ age_0_in }) - 1) return 0;else return s2_accumulated_empee_contribution_tax_relief({ age_0_in, paye_band_id_in, pension_contribution_in, usc_band_id_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ) + s2_empee_contribution_tax_relief({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in });
};
export const s2_pension_tax_relief_ratio = ({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) => s2_empee_contribution_tax_relief({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) / s0_empee_contribution({});

// assumption for tax relief calculation, 2024 values
export const s2_tax_credits = ({}) => 1875 + 1875; // single person + empee paye tax creedits

export const s2_empee_contribution_tax_relief = ({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) => s3_income_tax({ age_in,
  gross_salary_in: s2_salary({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ),
  //tax_credits_in: 3000, // ex- I specified like this
  pension_contribution_in: 0 }
) - s3_income_tax({ age_in,
  gross_salary_in: s2_salary({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ),
  //tax_credits_in: 3000, // ex- I specified like this
  pension_contribution_in: s0_empee_contribution({}) }
);
export const s2_empee_contribution_cost = ({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) => s0_empee_contribution({}) - s2_empee_contribution_tax_relief({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in });

// affected by bug: depends on gross_salary_in, for some reason
// issue #102
/*export const accumulated_empee_contribution_tax_relief = () => {
  if (age() == age_0() - 1) return 0;
  else
    return (
      accumulated_empee_contribution_tax_relief({ age_in: age() - 1 }) +
      empee_contribution_tax_relief()
    );
};*/

export const s2_emper_contribution = ({ emper_matching_rate_in }) => s0_empee_contribution({}) * s2_emper_matching_rate({ emper_matching_rate_in });
export const s2_salary = ({ age_in, salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in }) => {
  // at end of year
  if (s2_age({ age_in }) == s2_salary_age_0({ salary_age_0_in }) - 1) return s2_salary_0({ salary_0_in });else if (s2_age({ age_in }) >= s2_retirement_age({ retirement_age_in })) return 0;else if (s2_age({ age_in }) >= s2_salary_age_0({ salary_age_0_in })) return s2_salary({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
    age_in: s2_age({ age_in }) - 1 }
  ) * (1 + s2_salary_inflation_rate({ salary_inflation_rate_in }));else return s2_salary({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
    age_in: s2_age({ age_in }) + 1 }
  ) / (1 + s2_salary_inflation_rate({ salary_inflation_rate_in }));
};
export const s2_retirement_fund_value = ({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in, retirement_age_in }) =>
// at retirement:
s2_fund_value({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in,
  age_in: s2_retirement_age({ retirement_age_in }) }
);
export const s2_salaries_per_retirement_fund = ({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in, retirement_age_in, salary_age_0_in, salary_0_in, salary_inflation_rate_in }) => s2_retirement_fund_value({ age_0_in, fund_value_0_in, unit_growth_rate_in, emper_matching_rate_in, contribution_charge_rate_in, management_charge_rate_in, retirement_age_in }) / s2_salary({ salary_age_0_in, salary_0_in, retirement_age_in, salary_inflation_rate_in,
  age_in: s2_retirement_age({ retirement_age_in }) - 1 }
);

// inputs:

// using age and age_0 (starting age) as inputs, rather than year/time and age_0.
export const s2_age = ({ age_in }) => age_in; // input
export const s2_age_0 = ({ age_0_in }) => age_0_in;
export const s2_retirement_age = ({ retirement_age_in }) => retirement_age_in;
export const s2_salary_0 = ({ salary_0_in }) => salary_0_in;
export const s2_salary_age_0 = ({ salary_age_0_in }) => salary_age_0_in; // salary benchmark age is detached from age_0 so that results for different age_0 (starting age) are comparable // maybe this is bad naming
export const s2_salary_inflation_rate = ({ salary_inflation_rate_in }) => salary_inflation_rate_in;
export const s2_empee_contribution_rate = ({ empee_contribution_rate_in }) => empee_contribution_rate_in;
export const s2_emper_matching_rate = ({ emper_matching_rate_in }) => emper_matching_rate_in;
export const s2_unit_growth_rate = ({ unit_growth_rate_in }) => unit_growth_rate_in;
export const s2_fund_value_0 = ({ fund_value_0_in }) => fund_value_0_in;
export const s2_contribution_charge_rate = ({ contribution_charge_rate_in }) => contribution_charge_rate_in;



////////////// cul scope id 3 //////////

// heavily simplified incometax calculation for Irish incometax
// not reliable and not checked; single person only. Many other limitations
// work in progress

export const s3_tax_year = ({}) => 2024; // or 2023

export const s3_net_salary = ({ pension_contribution_in, age_in }) => s0_gross_salary({}) - s3_pension_contribution({ pension_contribution_in }) - s3_income_tax({ pension_contribution_in, age_in });
export const s3_income_tax = ({ pension_contribution_in, age_in }) => s3_paye({ pension_contribution_in, age_in }) + s3_prsi({}) + s3_usc({});
export const s3_effective_rate = ({ pension_contribution_in, age_in }) => 1 - s3_net_salary({ pension_contribution_in, age_in }) / s0_gross_salary({});
export const s3_prsi_taxable_salary = ({}) => s0_gross_salary({});

// Class A PRSI
// missing: "On 1 October 2024, all PRSI contribution rates increase by 0.1%.
// see: https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/social-insurance-prsi/paying-social-insurance
export const s3_prsi = ({}) => s3_prsi_taxable_salary({}) * s3_prsi_rate({}) * (s0_gross_salary({}) > 352 * 52 ? 1 : 0); // todo feature flag RE threshold

export const s3_prsi_rate = ({}) => 0.04;

// USC, should be mostly abstracted to a table loader
// issues: #11 #76
export const s3_usc_table = ({}) => [{
  band_id: 1,
  band_co: 12012,
  rate: 0.005
}, {
  band_id: 2,
  band_co: s3_tax_year({}) == 2024 ? 25760 : 22920,
  rate: 0.02
}, {
  band_id: 3,
  band_co: 70044,
  // this was off by 100e in error for 2023!
  rate: s3_tax_year({}) == 2024 ? 0.04 : 0.045
}, {
  band_id: 4,
  band_co: 0,
  rate: 0.08
}
// missing: 11% on self-employed income > 100k
];
export const s3_usc_band_id = ({ usc_band_id_in }) => usc_band_id_in;
export const s3_usc_band_end = ({ usc_band_id_in }) => {
  if (s3_usc_band_id({ usc_band_id_in }) == s3_usc_table({}).length) return 999999999;
  return s3_usc_table({})[s3_usc_band_id({ usc_band_id_in }) - 1].band_co;
};
export const s3_usc_band_start = ({ usc_band_id_in }) => {
  if (s3_usc_band_id({ usc_band_id_in }) == 1) return 0;
  return s3_usc_table({})[s3_usc_band_id({ usc_band_id_in }) - 2].band_co;
};
export const s3_usc_rate = ({ usc_band_id_in }) => s3_usc_table({})[s3_usc_band_id({ usc_band_id_in }) - 1].rate;
export const s3_usc_taxable_salary = ({}) => s0_gross_salary({}); // pay usc on pension contribution

export const s3_usc_by_band_id = ({ usc_band_id_in }) => s3_usc_rate({ usc_band_id_in }) * Math.min(s3_usc_band_end({ usc_band_id_in }) - s3_usc_band_start({ usc_band_id_in }), Math.max(s3_usc_taxable_salary({}) - s3_usc_band_start({ usc_band_id_in }), 0));
export const s3_usc = ({}) => s3_usc_table({}).reduce((a, v) => a + s3_usc_by_band_id({
  usc_band_id_in: v.band_id }
), 0) * (s0_gross_salary({}) > 13000 ? 1 : 0);

// PAYE, "
export const s3_paye_table = ({}) => [{
  band_id: 1,
  band_co: s3_tax_year({}) == 2024 ? 42000 : 40000,
  rate: 0.2
}, {
  band_id: 2,
  band_co: 100000,
  rate: 0.4
}, {
  band_id: 3,
  band_co: 0,
  rate: 0.4
}];
export const s3_paye_band_id = ({ paye_band_id_in }) => paye_band_id_in;
export const s3_paye_band_end = ({ paye_band_id_in }) => {
  if (s3_paye_band_id({ paye_band_id_in }) == s3_paye_table({}).length) return 999999999;
  return s3_paye_table({})[s3_paye_band_id({ paye_band_id_in }) - 1].band_co;
};
export const s3_paye_band_start = ({ paye_band_id_in }) => {
  if (s3_paye_band_id({ paye_band_id_in }) == 1) return 0;
  return s3_paye_table({})[s3_paye_band_id({ paye_band_id_in }) - 2].band_co;
};
export const s3_paye_rate = ({ paye_band_id_in }) => s3_paye_table({})[s3_paye_band_id({ paye_band_id_in }) - 1].rate;
export const s3_percentage_limit = ({ age_in }) => {
  if (s2_age({ age_in }) < 30) return 0.15;else if (s2_age({ age_in }) < 40) return 0.2;else if (s2_age({ age_in }) < 50) return 0.25;else if (s2_age({ age_in }) < 55) return 0.3;else if (s2_age({ age_in }) < 60) return 0.35;else return 0.4;
};
export const s3_pension_tax_relief = ({ pension_contribution_in, age_in }) =>
// "The maximum amount of earnings taken into account for calculating tax relief is 115k per year". See also 26.3 https://www.revenue.ie/en/tax-professionals/tdm/pensions/chapter-26.pdf
// calcs/approach not particularly validated
// but some results in ./check-pensions-tax-relief.png
Math.min(s3_pension_contribution({ pension_contribution_in }), s3_percentage_limit({ age_in }) * Math.min(115000, s0_gross_salary({})));
export const s3_paye_taxable_salary = ({ pension_contribution_in, age_in }) => Math.max(0, s0_gross_salary({}) - s3_pension_tax_relief({ pension_contribution_in, age_in }));
export const s3_paye_by_band_id = ({ paye_band_id_in, pension_contribution_in, age_in }) => s3_paye_rate({ paye_band_id_in }) * Math.min(s3_paye_band_end({ paye_band_id_in }) - s3_paye_band_start({ paye_band_id_in }), Math.max(s3_paye_taxable_salary({ pension_contribution_in, age_in }) - s3_paye_band_start({ paye_band_id_in }), 0));
export const s3_paye_over_bands = ({ pension_contribution_in, age_in }) => Math.max(0, s3_paye_table({}).reduce((a, v) => a + s3_paye_by_band_id({ pension_contribution_in, age_in,
  paye_band_id_in: v.band_id }
), 0) //- tax_credit() // input not working here => placed outside. Issue #95
);
export const s3_paye = ({ pension_contribution_in, age_in }) => Math.max(s3_paye_over_bands({ pension_contribution_in, age_in }) - s2_tax_credits({}), 0);
export const s3_net_salary_plus_pension_contribution = ({ pension_contribution_in, age_in }) => s3_net_salary({ pension_contribution_in, age_in }) + s3_pension_contribution({ pension_contribution_in });

// inputs:
export const s3_age_ = ({ age_in }) => age_in;
export const s3_gross_salary_ = ({ gross_salary_in }) => gross_salary_in;
export const s3_tax_credits_ = ({ tax_credits_in }) => tax_credits_in;
export const s3_pension_contribution = ({ pension_contribution_in }) => pension_contribution_in;


export const s2_income_tax = s3_income_tax


export const balance_orig = s1_balance_;
export const v = s1_v;
export const v_pow_term_left = s1_v_pow_term_left;
export const repayment_amount = s1_repayment_amount;
export const interest = s1_interest;
export const capital_repayment = s1_capital_repayment;
export const interest_repayment = s1_interest_repayment;
export const repayment_due = s1_repayment_due;
export const repayment = s1_repayment;
export const principal = s1_principal;
export const i = s1_i;
export const term = s1_term;
export const year = s1_year;
export const missed_repayment_year = s1_missed_repayment_year;
export const skip_interest = s1_skip_interest;
export const d_i_year = s1_d_i_year;
export const d_i = s1_d_i;
export const income_tax = s2_income_tax;
export const fund_value = s2_fund_value;
export const fund_growth = s2_fund_growth;
export const fund_charges = s2_fund_charges;
export const contribution_charge = s2_contribution_charge;
export const check_cfs = s2_check_cfs;
export const check_cfs_vs_fund_value = s2_check_cfs_vs_fund_value;
export const unit_balance = s2_unit_balance;
export const management_charge_rate = s2_management_charge_rate;
export const management_charge = s2_management_charge;
export const management_charge_units = s2_management_charge_units;
export const contributions = s2_contributions;
export const contribution_units = s2_contribution_units;
export const unit_price = s2_unit_price;
export const missed_contribution_age = s2_missed_contribution_age;
export const accumulated_empee_contributions = s2_accumulated_empee_contributions;
export const accumulated_empee_contribution_tax_relief = s2_accumulated_empee_contribution_tax_relief;
export const pension_tax_relief_ratio = s2_pension_tax_relief_ratio;
export const tax_credits = s2_tax_credits;
export const empee_contribution_tax_relief = s2_empee_contribution_tax_relief;
export const empee_contribution_cost = s2_empee_contribution_cost;
export const emper_contribution = s2_emper_contribution;
export const salary = s2_salary;
export const retirement_fund_value = s2_retirement_fund_value;
export const salaries_per_retirement_fund = s2_salaries_per_retirement_fund;
export const age = s2_age;
export const age_0 = s2_age_0;
export const retirement_age = s2_retirement_age;
export const salary_0 = s2_salary_0;
export const salary_age_0 = s2_salary_age_0;
export const salary_inflation_rate = s2_salary_inflation_rate;
export const empee_contribution_rate = s2_empee_contribution_rate;
export const emper_matching_rate = s2_emper_matching_rate;
export const unit_growth_rate = s2_unit_growth_rate;
export const fund_value_0 = s2_fund_value_0;
export const contribution_charge_rate = s2_contribution_charge_rate






////////// defaults (imports above tho): ////

export const balance = s0_balance;
export const interest_rate = s0_interest_rate;
export const empee_contribution = s0_empee_contribution;
export const fund_value2 = s0_fund_value2;
export const empee_contribution_tax_relief2 = s0_empee_contribution_tax_relief2;
export const gross_salary = s0_gross_salary


