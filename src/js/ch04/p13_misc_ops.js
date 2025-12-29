/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.13: Miscellaneous Operators
//
// Copyright 2025 Hans de Rooij
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ***************************************************************** */

import Die from '../die.js';

function conditionalOp() {
    return 'I ❤️ ' + ( 'truthy' ? 'the conditional operator' : 'if statements' );
}

function nullTypeof(v) {
    return typeof v === 'object' ? (v ? 'object' : 'null') : typeof v
}

function typeOf() {
    return `
        typeof null ➡️ ${typeof null}
        typeof undefined ➡️ ${typeof undefined}
        typeof true ➡️ ${typeof true}
        typeof 'foo' ➡️ ${typeof 'foo'}
        typeof 42 ➡️ ${typeof 42}
        typeof NaN ➡️ ${typeof NaN}
        typeof {} ➡️ ${typeof {}}
        typeof [] ➡️ ${typeof []}
        typeof function(){} ➡️ ${typeof function(){}}
        typeof Die ➡️ ${typeof Die}
        typeof new Die ➡️ ${typeof new Die}
        typeof new Date() ➡️ ${typeof new Date}

        nullTypeof({}) ➡️ ${nullTypeof({})}
        nullTypeof(null) ➡️ ${nullTypeof(null)}

    `;
}

function del() {
    var obj = { x: 1, y: 2, z: 3 };

    return `
        JSON.stringify(obj) ➡️ ${JSON.stringify(obj)}
        x in obj ➡️ ${'x' in obj}
        Object.keys(obj).length ➡️ ${Object.keys(obj).length}

        delete obj.x ➡️ ${delete obj.x}

        JSON.stringify(obj) ➡️ ${JSON.stringify(obj)}
        x in obj ➡️ ${'x' in obj}
        Object.keys(obj).length ➡️ ${Object.keys(obj).length}

        delete obj.x ➡️ ${delete obj.x}

    `;
}

function doVoid() {
    return `
        void null ➡️ ${void null}
        void undefined ➡️ ${void undefined}
        void true ➡️ ${void true}
        void 'foo' ➡️ ${void 'foo'}
        void 42 ➡️ ${void 42}
        void NaN ➡️ ${void NaN}
        void {} ➡️ ${void {}}
        void [] ➡️ ${void []}
        void function(){} ➡️ ${void function(){}}
        void Die ➡️ ${void Die}
        void new Die ➡️ ${void new Die}
        void new Date() ➡️ ${void new Date}

    `;
}

function comma() {
    var a = 1, b = 'foo';

    return `
        a ➡️ ${a}
        b ➡️ ${b}
        a++, b ➡️ ${a++, b}
        a ➡️ ${a}

    `;
}

export default {
   conditionalOp,
   typeOf,
   del,
   doVoid,
   comma
};
