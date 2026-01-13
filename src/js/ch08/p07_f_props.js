/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 8.7: Function properties
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

import Die from "../die.js";

//Function arity
function fArity( foo, bar ) {
    //Arity is the number of arguments expected to be passed in
    return `
        Number of parameters expected: ${fArity.length}
        Number of arguments passed in: ${arguments.length}

    `;
}

//Function name
function fJoeSchmoe() {
    return `Function name is: ${fJoeSchmoe.name}`;
}

//Function prototype property
function fProto() {
    var die = new Die;

    return `
        Every function has a prototype property: ${fArity.hasOwnProperty('prototype') ? '✅' : '❌'}
        The constructor property refers back to the function: ${fArity.prototype.constructor === fArity ? '✅' : '❌'}
        On custom objects constructor refers back to the constructor function: ${die.constructor === Die ? '✅' : '❌'}

    `;
}

export default {
    fArity,
    fJoeSchmoe,
    fProto
}
