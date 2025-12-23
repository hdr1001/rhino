/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3.6: Wrapper Objects
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

//Primitives
var str0 = 'Object wrappers for primitives';
var str1 = 'Object wrappers for primitives';
var num = Math.PI;
var boole = false;

//Object versions of primitives
var oStr = new String('Object wrappers for primitives');
var oNum = new Number(Math.PI);
var oBoole = new Boolean(false);

export default function primitiveWrappers() {
    return `
        str0 = "${str0}" (with type ${typeof str0})
        str1 = "${str1}" (with type ${typeof str1})
        oStr = "${oStr}" (with type ${typeof oStr})

        ✅ String comparison by value
        str0 == oStr evaluates to ${str0 == oStr}

        ❌ No strict equality because of different types
        str0 === oStr evaluates to ${str0 === oStr}

        ✅ Strict equality with str1 (no by reference comparison)
        str0 === str1 evaluates to ${str0 === str1}

        Temporary object wrappers enable functionality like this
        str0.length ➡️ ${str0.length}

    `;
}
