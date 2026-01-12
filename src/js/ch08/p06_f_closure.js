/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 8.6: Closures
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

import Die from '../die.js';

function closure() {
    var die = new Die;

    //console.log(`Value of the die just instantiated: ${die.valueOf()}`);

    return function() {
        return `From withing the closure, the value of the die is ${+die}`
    };
}

export default function() {
    //Create tow (separate) closures
    var closure1 = closure();

    var closure2 = closure();

    //Call the functions created by the closures
    return `
        Calling closure1: ${closure1()}

        Calling closure2: ${closure2()}

    `;
};
