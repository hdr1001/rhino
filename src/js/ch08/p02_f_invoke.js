/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 8.1: Function invocation
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

//Immediately invoked function expression (IIFE)
var strict = function() { return !this }();

//Function statement
function inStrictMode() {
    return `We are ${strict ? '' : 'not '}in strict mode`;
}

//Method invocation
function invokeMethod() {
    var die = new Die; //Constructor invocation

    return `
        First method invocation, die.toString() ➡️ ${die.toString()}
        Second method invocation, die.doThrow() ➡️ ${die.doThrow()}
        Third method invocation, die.toString() ➡️ ${die.toString()}

    `;
}

//Constructor function
function Dice(num) {
    if(num == null) num = 2; //default value

    if(typeof num !== 'number') { throw new TypeError('Argument must be a number') } 
    if(num < 1 || num > 10) { throw new RangeError('Argument must be larger than 1 and smaller or equal to 10') }

    this.dice = [];

    for(var i = 0; i < num; i++) {
        this.dice.push(new Die);
    }
}

Dice.prototype.doThrow = function() {
    for(var i = 0; i < this.dice.length; i++) {
        this.dice[i].doThrow();
    }

    return this.valueOf();
};

Dice.prototype.valueOf = function() {
    return this.dice.reduce((acc, elem) => acc + elem.valueOf(), 0);
};

Dice.prototype.toString = function() {
    return this.dice.map(die => die.valueOf()).join(', ') + ` (Total: ${this.valueOf()})`;
};

//Testing the constructor function
//console.log(new Dice(3).toString()); //Constructor function invocation

//Indirect invocation
function indirectInvocation() {
    function fRefThis() {
        if(this == null) {
            throw new Error('this is null or undefined')
        }

        return this.prop || 'this.prop is not defined';
    }

    var arrRet = [];

    try {
        arrRet.push('Trying');
        arrRet.push(fRefThis());
    }
    catch(err) {
        arrRet.push(`Caught error: ${err.message}`)
    }

    var objI = { prop: 'prop is defined' }, fRefThisBoundToObjI = fRefThis.bind(objI);
    var objII = {}, fRefThisBoundToObjII = fRefThis.bind(objII);

    arrRet.push(`Using call to invoke ➡️ ${fRefThis.call(objI)}`);
    arrRet.push(`Using apply to invoke ➡️ ${fRefThis.apply(objI)}`);
    arrRet.push(`Using bind to invoke ➡️ ${fRefThisBoundToObjI()}`);
    arrRet.push(`Using bind to invoke ➡️ ${fRefThisBoundToObjII()}`);

    return arrRet.join('\n');
}

//Call invocation to determine if an object is an array
//Use Array.isArray in ES6 code 
function isArr(obj) {
    //These typeof checks all return 'object'
    console.log('typeof {} = ' + typeof {});
    console.log('typeof [] = ' + typeof []);
    console.log('typeof null = ' + typeof null);

    //the toString method defined on Object.prototype is a function
    console.log('typeof Object.prototype.toString = ' + typeof Object.prototype.toString);

    //The standard object toString method returns the object type and class
    console.log('{ foo: \'bar\' }.toString() = ' + { foo: 'bar' }.toString());

    console.log(`Array inherits from Object ➡️ ${Object.getPrototypeOf(Array.prototype) === Object.prototype}`);

    //The Array prototype has its own toString method though
    console.log('[ \'foo\', \'bar\' ].toString() = ' + [ 'foo', 'bar' ].toString());
    console.log('[].toString() = ' + [].toString());

    //Use call to invoke Object.prototype.toString using null as the invocation context
    console.log('Object.prototype.toString.call(null) ➡️ ' + Object.prototype.toString.call(null));

    //Use function Object.prototype.toString, invoked with call, to determine if obj is an array
    return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Array]';
};

export default {
    inStrictMode,
    invokeMethod,
    Dice,
    indirectInvocation,
    isArr
}
