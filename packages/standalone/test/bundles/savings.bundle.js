
////////////// cul scope id 0 //////////

export const s0_balance = ({ year_in, duration_in, annual_payment_in, interest_rate_in }) => {
  if (s0_year({ year_in }) < 0) return 0;else
  if (s0_year({ year_in }) == 0) return s0_deposits({ year_in, duration_in, annual_payment_in });else
  return s0_balance({ duration_in, annual_payment_in, interest_rate_in, year_in: s0_year({ year_in }) - 1 }) + s0_deposits({ year_in, duration_in, annual_payment_in }) + s0_interest({ year_in, duration_in, annual_payment_in, interest_rate_in });
};

export const s0_deposits = ({ year_in, duration_in, annual_payment_in }) => {
  if (s0_year({ year_in }) >= 0 && s0_year({ year_in }) < s0_duration({ duration_in }))
  return s0_annual_payment({ annual_payment_in });else

  return 0;
};

export const s0_interest = ({ year_in, duration_in, annual_payment_in, interest_rate_in }) => {
  if (s0_year({ year_in }) == 0) return 0;else
  return s0_balance({ duration_in, annual_payment_in, interest_rate_in, year_in: s0_year({ year_in }) - 1 }) * s0_interest_rate({ interest_rate_in });
};

// inputs:
export const s0_year = ({ year_in }) => year_in;
export const s0_annual_payment = ({ annual_payment_in }) => annual_payment_in;
export const s0_duration = ({ duration_in }) => duration_in; // years
export const s0_interest_rate = ({ interest_rate_in }) => interest_rate_in; // annual












////////// defaults (imports above tho): ////

export const balance = s0_balance;
export const deposits = s0_deposits;
export const interest = s0_interest;
export const year = s0_year;
export const annual_payment = s0_annual_payment;
export const duration = s0_duration;
export const interest_rate = s0_interest_rate


