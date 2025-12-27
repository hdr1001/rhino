/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.4: Property access expressions
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

var arr = [ 1, null, 3, { prop1: 'foo', prop2: 'bar' } ];

var obj = { curr: 'eur', iso: { alpha2: 'nl', alpha3: 'nld' } };

export function propAccess() {
    try {
        //Optional chaining (part of ES2020)
        console.log(arr[1]?.err);
        console.log(arr[arr.length]?.err)

        //TypeError: Cannot read properties of null (reading 'err')
        //arr[1].err;
        //TypeError: Cannot read properties of undefined (reading '0')
        arr[arr.length][0]      
    }
    catch (err) {
        console.error(err.message);
    }

    return `
        arr[0] = ${arr[0]}
        obj.curr = ${obj.curr}

        arr[3].prop1 = ${arr[3].prop1}
        obj.iso.alpha2 = ${obj.iso.alpha2}
        obj.iso['alpha3'] = ${obj.iso['alpha3']}

        arr[0].na = ${arr[0].na}
        arr[3].prop1.length = ${arr[3].prop1.length}
        arr[3].prop1.na = ${arr[3].prop1.na}
        arr[1] = ${arr[1]}
        arr[-1] = ${arr[-1]}
        arr[arr.length] = ${arr[arr.length]}
        arr[arr.length + 100] = ${arr[arr.length + 100]}
        arr['na'] = ${arr['na']}
        arr.na = ${arr.na}

    `;
};
