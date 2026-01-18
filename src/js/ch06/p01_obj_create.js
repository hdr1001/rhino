/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.1: Object creation
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

import { Die } from '../die.js';

//Object literal
function objCreate() {
    var oEmpty = {}; //oEmpty is initialized using an empty object literal

    oEmpty.toString = function() { //JS objects are dynamic
        return 'was created as an empty object';
    }

    return 'oEmpty is an ' + typeof oEmpty + ' and ' + oEmpty;
}

function dieToStr() {
    return 'You threw ➡️ ' + this.numDots;
}

function objCreateDie() {
    var oDie = { //Also an object literal
        numDots: Math.floor(Math.random() * 6) + 1,
        valueOf: function() { return this.numDots }
    };

    oDie.toString = dieToStr;

    return String(oDie);
    //return 'Number of dots ' + +oDie;
}

//Constructor function
function objCreateNew() {
    var oEmpty = new Object(); //Same as {}
    
    oEmpty.toString = function() { //JS objects are dynamic
        return 'was created as an empty object using new Object()';
    }

    return 'oEmpty is an ' + typeof oEmpty + ' and ' + oEmpty;
}

function arrCreateNew() {
    var arrDice = new Array(5); //Array with 5 elements

    for(var idx = 0; idx < arrDice.length; idx++) {
        arrDice[idx] = +(new Die)
    }

    return arrDice.join(', ') + ' (total ' + arrDice.reduce((accumulator, elem) => accumulator + elem, 0) + ')';
} 

function objCreateDieNew() {
    return String(new Die());
}

//Object.create
var objProto = {
    prop: 'a property on the prototype',
    level: {
        num: 42,
        str: 'forty-two'
    },
    method: function() {
        return 'Value of prop: ' + this.prop + ' (@level ' + this.level.num + ')';
    }
};

function objCreateProto() {
    var obj = Object.create(objProto);

    obj.prop = 'On the new object';

    return `
        obj.constructor === Object ➡️ ${obj.constructor === Object}
        obj.__proto__ === objProto ➡️ ${obj.__proto__ === objProto}
        Object.keys(obj)           ➡️ ${Object.keys(obj)}
        Object.keys(objProto)      ➡️ ${Object.keys(objProto)}

        objProto.method()          ➡️ ${objProto.method()}
        obj.method()               ➡️ ${obj.method()}
    `
}

export default {
    objCreate,
    objCreateDie,
    objCreateNew,
    arrCreateNew,
    objCreateDieNew,
    objCreateProto
};
