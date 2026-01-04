/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.1: Array instantiation
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

import globals from '../globals.js';

function logArr(name, arr) {
    return `
        ${name} is an ${typeof arr},
        Array.isArray(${name}) = ${Array.isArray(arr)},
        ${name}.length = ${arr.length} 
        and content is [${arr.join(', ')}]        
    `
}

export default function arrCreate() {
    const arrRet = [];

    var arrEmpty = []; //arrEmpty is initialized using an empty array literal

    arrRet.push(logArr('arrEmpty', arrEmpty));

    arrRet.push(logArr('globals.arrTypes', globals.arrTypes));

    var arrNew1 = new Array(); //arrNew1 is initialized using the Array constructor

    arrRet.push(logArr('arrNew1', arrNew1));

    var arrNew2 = new Array(3); //arrNew1 is initialized with a set length

    arrRet.push(logArr('arrNew2', arrNew2));

    return arrRet.join('\n');
};
