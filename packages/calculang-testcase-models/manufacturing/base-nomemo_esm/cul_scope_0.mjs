export const revenue = ({ units_in, price_in }) => {
  return units({ units_in }) * price({ price_in });
};

// variable costs only, OK for testing
export const costs = ({ units_in }) => 100 * units({ units_in });

export const profit = ({ units_in, price_in }) => revenue({ units_in, price_in }) - costs({ units_in });

// inputs
export const units = ({ units_in }) => units_in;
export const price = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?