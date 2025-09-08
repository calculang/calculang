let model = {}; 



////////////// cul scope id 0 //////////


export const s0_interest_rate = ({}) => 0.1; // override interest rate



////////////// cul scope id 1 //////////

export const s1_balance = ({ year_in, duration_in, annual_payment_in }) => {
  if (s1_year({ year_in }) < 0) return 0;else if (s1_year({ year_in }) == 0) return s1_deposits({ year_in, duration_in, annual_payment_in });else return s1_balance({ duration_in, annual_payment_in,
    year_in: s1_year({ year_in }) - 1 }
  ) + s1_deposits({ year_in, duration_in, annual_payment_in }) + s1_interest({ year_in, duration_in, annual_payment_in });
};
export const s1_deposits = ({ year_in, duration_in, annual_payment_in }) => {
  if (s1_year({ year_in }) >= 0 && s1_year({ year_in }) < s1_duration({ duration_in })) return s1_annual_payment({ annual_payment_in });else return 0;
};
export const s1_interest = ({ year_in, duration_in, annual_payment_in }) => {
  if (s1_year({ year_in }) == 0) return 0;else return s1_balance({ duration_in, annual_payment_in,
    year_in: s1_year({ year_in }) - 1 }
  ) * s0_interest_rate({});
};

// inputs:
export const s1_year = ({ year_in }) => year_in;
export const s1_annual_payment = ({ annual_payment_in }) => annual_payment_in;
export const s1_duration = ({ duration_in }) => duration_in; // years
export const s1_interest_rate_ = ({ interest_rate_in }) => interest_rate_in; // annual





export const balance = s1_balance; model['balance'] = balance; ;
export const deposits = s1_deposits; model['deposits'] = deposits; ;
export const interest = s1_interest; model['interest'] = interest; ;
export const year = s1_year; model['year'] = year; ;
export const annual_payment = s1_annual_payment; model['annual_payment'] = annual_payment; ;
export const duration = s1_duration; model['duration'] = duration; ;
export const interest_ratew = s1_interest_rate_; model['interest_ratew'] = interest_ratew; 






////////// defaults (imports above tho): ////

export const interest_rate = s0_interest_rate; model['interest_rate'] = interest_rate


model['s0_interest_rate'] = s0_interest_rate;
model['s1_balance'] = s1_balance;
model['s1_deposits'] = s1_deposits;
model['s1_interest'] = s1_interest;
model['s1_year'] = s1_year;
model['s1_annual_payment'] = s1_annual_payment;
model['s1_duration'] = s1_duration;
model['s1_interest_rate_'] = s1_interest_rate_;

