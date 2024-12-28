// TODO make this a test

import { range } from 'underscore'

import { writeFile } from 'node:fs/promises'

// I can better encapsulate calcs by calling the api and overriding in here, OR use notebooks

import { compile, compile_new, bundleIntoOne, introspection } from '../../index.js'; 
import { pre_fetch } from '@calculang/calculang-js/bin/pre_fetch.node.mjs';

//import { repayment_amount, capital_repayment, interest_repayment } from './url-loan.js'

// TODO pre_fetch Depends on a url (local/remote) SO I need the Sourcecode option DONE
// For impacts I want to enter many sources so fs again!
const fs = await pre_fetch({'entrypoint.cul.js': `
  
                    import {all_cul, balance_ as balance_orig} from "https://raw.githubusercontent.com/declann/calculang-loan-validator/refs/heads/main/models/simple-loan.cul.js";

                    // if I use all_cul here I get a Babel parse error VarRedeclaration
                    import { all_cul /* see #159 */ } from "https://glcdn.githack.com/declann/calculang.dev/-/raw/main/models/taxes-pensions/pension-calculator.cul.js" //"https://calculang.dev/models/taxes-pensions/pension-calculator.cul.js"; // BUG TOFIX TODO I can't do ?v=x etc.

                    export const balance = () => {
                      if (year() == 5) return balance_orig() + 100_000; // TODO check interest values?
                      else return balance_orig()
                    }

                    // bypassing existing thing
                    export const interest_rate = () => {
                      if (year() < 8) return i()
                      else return i() + 0.1
                    }

                    export const empee_contribution = () => 10_000

                    // https://github.com/calculang/calculang/issues/158
                    export const fund_value2 = () => fund_value({age_in:year()+age_0()})
                    export const empee_contribution_tax_relief2 = () => empee_contribution_tax_relief({age_in:year()+age_0()})
                    
                    export const gross_salary = () => 100_000



  `})

  console.log(fs)

/*const model = await compile({
  entrypoint: 'entrypoint.cul.js.cul.js',
  fs,
  memo: true
})*/

      let introspection_a;
      introspection_a = await introspection('entrypoint.cul.js', fs);

const compiled = compile_new('entrypoint.cul.js', introspection_a.fs0, introspection_a)

const bundle = bundleIntoOne(compiled, introspection_a, true);

//await writeFile('introspection.js', bundleIntoOne(compiled, introspection_a, false))

//console.log(bundle)

await writeFile('remote-composition.bundle.js', bundleIntoOne(compiled, introspection_a, false))

// TODO import objectURL of a Blob (supports unicode; better debugging)
const data_uri_prefix =         "data:" + "text/javascript" + ";base64,";
const u = data_uri_prefix + btoa(bundle)//(node) Buffer.from(bundle).toString('base64')

const m = await import(u)


const cursor = { missed_repayment_year_in: -10, term_in: 10, i_in: 0.1*0, principal_in: 100_000, skip_interest_in: false,
  age_0_in: 20, contribution_charge_rate_in: 0.05, emper_matching_rate_in: 0, fund_value_0_in: 0, management_charge_rate_in:0.01, missed_contribution_age_in:-10, retirement_age_in:65, salary_0_in:0, salary_age_0_in:30, salary_inflation_rate_in:0, unit_growth_rate_in:0.05 }

const out = (cursor2) => range(1,cursor.term_in+3).map(year_in => ({
  year_in,
  balance: m.balance({...cursor, year_in, ...cursor2}),
  repayment_amount: m.repayment_amount({...cursor, year_in, ...cursor2}),
  capital_repayment: m.capital_repayment({...cursor, year_in, ...cursor2}),
  interest_repayment: m.interest_repayment({...cursor, year_in, ...cursor2}),
}))

console.table(out({i_in:0}))

console.table(out({i_in:0.1})) // todo reduce over args type api?

console.table(
range(-1,cursor.term_in+3).map(year_in => ({
  year_in,
  balance: m.balance({...cursor, year_in}).toFixed(2).padStart(10),
  repayment_amount: m.repayment_amount({...cursor, year_in}).toFixed(2).padStart(10),
  interest_repayment: m.interest_repayment({...cursor, year_in}).toFixed(2).padStart(10),
  empee_contribution: m.empee_contribution({...cursor, year_in}).toFixed(2).padStart(10),
  empee_contribution_tax_relief2: m.empee_contribution_tax_relief2({...cursor, year_in}).toFixed(2).padStart(10),
  fund_value2: m.fund_value2({...cursor, year_in}).toFixed(2).padStart(10)
}))
)

//console.log(m.fund_value({...cursor, age_in:25, year_in: 5}))

// should I have some check formulas?


// TODO how to make term be variable so this suits credit cards etc? e.g. https://sourceforge.net/projects/debtpayoff/
