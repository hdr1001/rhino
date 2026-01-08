/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.10: Array.isArray()
//
// Copyright 2026 Hans de Rooij
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

import { classAttr } from '../utils.js';

//Array.isArray()
export default function arrIsArray() {
    var arrLike = document?.body?.children;

    if(arrLike) {
        console.log('classAttr(arrLike) ➡️ ' + classAttr(arrLike) );
        console.log('arrLike.length ➡️ ' + arrLike.length );
        if(arrLike.length) {
            console.log('classAttr(arrLike[0]) ➡️ ' + classAttr(arrLike[0]));
        }
    }

    return `
        Array.isArray([]) ➡️ ${Array.isArray([])}
        Array.isArray(arrLike) ➡️ ${Array.isArray(arrLike)}

    `
}

//Polyfill
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
else {
    //console.log('Array.isArray supported natively');
}
