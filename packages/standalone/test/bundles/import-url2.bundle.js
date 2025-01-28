
////////////// cul scope id 0 //////////


export const s0_actual_interest_rates = ({}) => s1_actual_interest_rates_({}).map((d) => d * .5);



////////////// cul scope id 1 //////////



export const s1_year = ({ year_in }) => year_in;
export const s1_actual_interest_rates_ = ({}) => [0.02, 0.03, 0.03, 0.00, 0.01, 0.01];
export const s1_actual_interest_rate_co = ({ actual_interest_rate_co_in }) => actual_interest_rate_co_in;
export const s1_interest_rate = ({ year_in, actual_interest_rate_co_in }) => {
  if (s1_year({ year_in }) > s1_actual_interest_rate_co({ actual_interest_rate_co_in })) return s2_interest_rate_({});else return s0_actual_interest_rates({})[s1_year({ year_in })];
};



////////////// cul scope id 2 //////////



export const s2_annual_payment = ({}) => 1000;
export const s2_duration = ({}) => 5;
export const s2_interest_rate_ = ({}) => 0.02;



////////////// cul scope id 3 //////////

export const s3_balance = ({ year_in, actual_interest_rate_co_in }) => {
  if (s1_year({ year_in }) < 0) return 0;else if (s1_year({ year_in }) == 0) return s3_deposits({ year_in });else return s3_balance({ actual_interest_rate_co_in,
    year_in: s1_year({ year_in }) - 1 }
  ) + s3_deposits({ year_in }) + s3_interest({ year_in, actual_interest_rate_co_in });
};
export const s3_deposits = ({ year_in }) => {
  if (s1_year({ year_in }) >= 0 && s1_year({ year_in }) < s2_duration({})) return s2_annual_payment({});else return 0;
};
export const s3_interest = ({ year_in, actual_interest_rate_co_in }) => {
  if (s1_year({ year_in }) == 0) return 0;else return s3_balance({ actual_interest_rate_co_in,
    year_in: s1_year({ year_in }) - 1 }
  ) * s1_interest_rate({ year_in, actual_interest_rate_co_in });
};

// inputs:
export const s3_year_ = ({ year_in }) => year_in;
export const s3_annual_payment_ = ({ annual_payment_in }) => annual_payment_in;
export const s3_duration_ = ({ duration_in }) => duration_in; // years
export const s3_interest_rate_ = ({ interest_rate_in }) => interest_rate_in; // annual


export const s2_balance = s3_balance;
export const s2_deposits = s3_deposits;
export const s2_interest = s3_interest;
export const s1_balance = s2_balance;
export const s1_deposits = s2_deposits;
export const s1_interest = s2_interest;
export const s1_duration = s2_duration;
export const s1_interest_rate_expected = s2_interest_rate_;
export const s1_annual_payment = s2_annual_payment


export const actual_interest_rates_orig = s1_actual_interest_rates_;
export const balance = s1_balance;
export const deposits = s1_deposits;
export const interest = s1_interest;
export const duration = s1_duration;
export const interest_rate_expected = s1_interest_rate_expected;
export const annual_payment = s1_annual_payment;
export const year = s1_year;
export const actual_interest_rate_co = s1_actual_interest_rate_co;
export const interest_rate = s1_interest_rate






////////// defaults (imports above tho): ////

export const actual_interest_rates = s0_actual_interest_rates


