/*
Copyright (C) 2021  DCN Consulting Ltd (incorporated in Ireland)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3,
as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import path from 'path';

import { getOptions, parseQuery } from 'loader-utils';

import introspection from './index.js';

import { transformSync } from '@babel/core';

export default async function loader(content, map, meta) {
  //debugger; // memoloader

  if (this.resourceQuery != '' && parseQuery(this.resourceQuery).memoed)
    // see use of +memoed added to query below, TODO validate # executions given updated logic
    return content;
  else {
    const child_introspection = await introspection(this.resourcePath, {
      memo: false,
    });

    const to_memo = [...child_introspection.cul_functions.values()].filter(
      (d) =>
        d.reason != 'input definition' &&
        d.cul_scope_id == 0 && // referring to child introspection call
        d.name.charAt(d.name.length - 1) != '$' // don't memo the memo. Alt: don't create cul_function for it?
    );

    const generated = to_memo
      .map(
        (d) =>
          `

////////// start ${d.name} memo-loader code //////////
const ${d.name}$m = memoize(999999, isEqual)(${d.name}$);
export const ${d.name} = (a) => {
  return ${d.name}$m(a);
  ${d.name}$(); // never run, but here to "trick" calculang graph logic
};
////////// end ${d.name} memo-loader code //////////

`
      )
      .join('');

    // todo remove base ref below!
    return `
    import memoize from 'lru-memoize';
    import { isEqual } from 'underscore'; // TODO poor tree shaking support, or why is this impact so massive? Move to lodash/lodash-es?
    
    import { ${to_memo
      .map((d) => `${d.name}_ as ${d.name}$`) // as needed because of _ overlaps
      .join(', ')} } from './${path.relative(this.context, this.resourcePath)}${
      this.resourceQuery == '' ? '?' : this.resourceQuery + '&'
    }+memoed';
    
    ${generated}
    `;
  }
}
