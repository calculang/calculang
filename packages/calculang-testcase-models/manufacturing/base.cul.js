export const revenue = () => {
  return units() * price();
};

// TODO add costs etc. - do we want these to feed into all tests though?

export const units = () => units_in;
export const price = () => price_in;

// ?? what if an explicit import in base referred back to A or B?
