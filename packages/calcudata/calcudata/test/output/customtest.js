import {index,lookup_fields_index, s0_cardinality_factors, square} from './calcudata-output-small-test.js'

console.log(index({a_in:1,b_in:1}))
console.log(lookup_fields_index({a_in:1,b_in:1}));

console.log(s0_cardinality_factors({}))

console.log(square({a_in:1,b_in:1}))
console.log(square({a_in:2,b_in:1}))
//console.log(square({a_in:3,b_in:1})) // err: ok, todo handling
console.log(square({a_in:5,b_in:1}))
console.log(square({a_in:5,b_in:5}))

// Works!!