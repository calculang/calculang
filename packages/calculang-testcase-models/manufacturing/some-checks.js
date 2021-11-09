#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const price_change_reconciliation = require('./price-change-reconciliation');

console.log(
  price_change_reconciliation.revenue({
    units_in: 10,
    price_in: 10,
    price_multiplier_in: 1.1,
    step_in: 0,
  })
);
console.log(
  price_change_reconciliation.revenue({
    units_in: 10,
    price_in: 10,
    price_multiplier_in: 1.1,
    step_in: 1,
  })
);

const revenue_with_demand_curve = require('./revenue-with-demand-curve');

console.log(revenue_with_demand_curve.revenue({ price_in: 3 }));
console.log(revenue_with_demand_curve.revenue({ price_in: 3.5 }));
