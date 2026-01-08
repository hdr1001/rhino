/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.8: Object attributes
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
import Die from '../die.js';

//The prototype attribute
//Everything you always wanted to know about an object's prototype attribute ➡️ ch04_06_obj_creation.js

export function listClassAttr() {
    return `
        null is of class ${classAttr(null)}
        undefined is of class ${classAttr(undefined)}
        true is of class ${classAttr(true)}
        42 is of class ${classAttr(42)}
        'foo' is of class ${classAttr('foo')}
        [] is of class ${classAttr([])}
        {} is of class ${classAttr({})}
        function() {} is of class ${classAttr(function() {})}
        () => {} is of class ${classAttr(() => {})}
        new Date() is of class ${classAttr(new Date())}
        new RegExp() is of class ${classAttr(new RegExp())}
        new Die() is of class ${classAttr(new Die())}

    `;
}

Die.prototype.setExt = function(i) {
    switch(i) {
        case 0: return Object.preventExtensions(this);
        case 1: return Object.seal(this);
        case 2: return Object.freeze(this);
        default:
            throw new RangeError(`Invalid argument i (${i}) in setExt()`);
    }
};

Die.prototype.getExt = function(i) {
    switch(i) {
        case 0: return `extensible: ${Object.isExtensible(this)}`;
        case 1: return `sealed: ${Object.isSealed(this)}`;
        case 2: return `frozen: ${Object.isFrozen(this)}`;
        default:
            throw new RangeError(`Invalid argument i (${i}) in getExt()`);
    }
};

//The extensible attribute
export function extAttr(i = 0) {
    var retArr = [], die = new Die();

    retArr.push('die is ' + die.getExt(i));

    die.newProp1 = 'new!';

    retArr.push(`die.newProp1: ${die.newProp1}\n`);

    die.setExt(i);

    retArr.push('die is ' + die.getExt(i) + '\n');

    //Try to add a property through assignment
    try {
        die.newProp2 = 'This will fail'
    } 
    catch(err) {
        retArr.push(err.constructor.name + ': ' + err.message)
    }

    retArr.push(`'newProp2' in die: ${'newProp2' in die}\n`); //false

    //Try to add a property on the object's prototype
    const npp = 'newProtoProp' + i;
    Die.prototype[npp] = `New property on prototype ➡️ ${npp}, i = ${i}`;
    
    retArr.push(`die['${npp}']: ${die[npp]}\n`);

    //Try to delete an existing property
    try {
        delete die.newProp1 //Will fail for sealed & frozen
    } 
    catch(err) {
        retArr.push(err.constructor.name + ': ' + err.message)
    }        

    retArr.push(`'newProp1' in die: ${'newProp1' in die}\n`);

    //Try to change an existing property
    try {
        die.lang = 'nl' //Will fail for frozen
    } 
    catch(err) {
        retArr.push(err.constructor.name + ': ' + err.message)
    }        

    retArr.push(`die.language: ${die.lang}`);

    return retArr.join('\n');
}
