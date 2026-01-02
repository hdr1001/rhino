/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.4: Object property testing
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

const testProps = ['foo', 'bar', 'undef', 'na', 'toString'];

var obj = {
    foo: 'To be or not to be',
    bar: 42,
    undef: undefined
};

var arrTestFunctions = [
    //Bracket notation
    () => testProps.map(prop => `obj['${prop}'] => ${obj[prop]}`),

    //in operator
    () => testProps.map(prop => `'${prop}' in obj => ${prop in obj}`), 

    //hasOwnProperty method
    () => testProps.map(prop => `obj.hasOwnProperty('${prop}') => ${obj.hasOwnProperty(prop)}`),

    //propertyIsEnumerable method
    () => testProps.map(prop => `obj.propertyIsEnumerable('${prop}') => ${obj.propertyIsEnumerable(prop)}`)
];

function invokeTestFunction(idxFunc = 0) {
    return arrTestFunctions[idxFunc]().join('\n');
}

function testNonEnumerable() {
    return `
        Object.prototype.hasOwnProperty('toString'): ${Object.prototype.hasOwnProperty('toString')}
        Object.prototype.propertyIsEnumerable('toString'): ${Object.prototype.propertyIsEnumerable('toString')}

    `;
}
export default { 
    invokeTestFunction,
    testNonEnumerable
}
