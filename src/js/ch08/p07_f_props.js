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
        Object.getPrototypeOf(die) refers to Die.prototype: ${Object.getPrototypeOf(die) === Die.prototype ? '✅' : '❌'}
        instanceof is determined by the constuctor prototype: ${die instanceof Die ? '✅' : '❌'}

    `;
}

//Using call & apply below to set the this value
function cheatDie(numDots) {
    numDots = numDots || 6;

    if(!(this && 'numDots' in this)) {
        throw new TypeError('cheatDie is meant to be invoked in the context of a Die instance')
    }

    if(this.numDots === numDots) {
        console.log('No need to cheat, the die already shows ' + numDots);
        return;
    }

    console.log(`Cheating die, setting the number of dots from ${this.numDots} to ${numDots}`);

    this.numDots = numDots;  //🦹
}

//The functions call and apply are methods of Function.prototype
function callApply() {
    var die = new Die;

    try {
        //cheatDie(null);
        //cheatDie.call(die);
        //cheatDie.call(die, 5);
        //cheatDie.apply(die);
        //cheatDie.apply(die, []);
        cheatDie.apply(die, [6]);
    }
    catch(err) {
        console.error('Caught error: ' + err.message)
    }

    return `
        ${die} 🤔
    `;
}

function bind() {
    var die = new Die();

    //Bind one parameter
    var fStr2 = function(a, b) { return a + b };

    var bindFoo = fStr2.bind(null, 'foo & ');

    //Two parameters, second is the value of a class instance   
    var fStr3 = function(a, b, c) { return a + b + c };

    var bindFooDie = fStr3.bind(null, 'foo ', die);

    //Bind an object instance as this
    var fThisRef1 = function(parm) { return this.value + parm };

    var bindLiteral = fThisRef1.bind( { value: 39 } );

    var fThisRef2 = function(parm) { return +this + parm };

    var bindDieInstance = fThisRef2.bind( die );

    return `
        bindFoo('bar') = ${ bindFoo('bar') }
        bindFooDie(' baz') = ${ bindFooDie(' baz') }
        bindLiteral(3) = ${ bindLiteral(3) }
        bindDieInstance(42) = ${ bindDieInstance(42) }

    `;
}

export default {
    fArity,
    fJoeSchmoe,
    fProto,
    callApply,
    bind
}
