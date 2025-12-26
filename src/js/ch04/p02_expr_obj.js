/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.2: Object and Array Initializers
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

export default function literals() {
    var int = 41, dbl = 2.7, str = 'String value';

    //Empty
    var obj0 = {};
    var arr0 = [];

    var ret = `
        Object.keys(obj0).length: ${Object.keys(obj0).length}
        arr0.length: ${arr0.length}

    `;

    //Object with properties
    var obj1 = {
        name: 'John',
        age: 30,
        isEmployed: true
    };

    var arr1 = [1, 2, 3, 4, 5];

    ret += `
        JSON.stringify(obj1): ${JSON.stringify(obj1)}
        arr1.join(', '): ${arr1.join(', ')}

    `;

    //Expressions as property values
    var obj2 = {
        intProp: int + 1,
        dblProp: Math.PI.toFixed(2),
        strProp: str
    };

    ret += `
        JSON.stringify(obj2): ${JSON.stringify(obj2)}
        [ 2 / 4, 3 * 5 ].join(', '): ${[ 2 / 4, 3 * 5 ].join(', ')}

    `;

    return ret;
}
