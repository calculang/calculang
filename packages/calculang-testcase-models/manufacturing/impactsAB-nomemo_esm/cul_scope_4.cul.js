export const revenue = () => {
  return units() * price();
};

// variable costs only, OK for testing
export const costs = () => 100 * units();

export const profit = () => revenue() - costs();

// inputs
export const units = () => units_in;
export const price = () => price_in;

// ?? what if an explicit import in base referred back to A or B?
