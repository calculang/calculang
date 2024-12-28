import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pre_fetch } from '@calculang/calculang-js/bin/pre_fetch.node.mjs'

const cwd = import.meta.dirname;

    const t = await pre_fetch('aa.cul.js')
    console.log('thing', t)