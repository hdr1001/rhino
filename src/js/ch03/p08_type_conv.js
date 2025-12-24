/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3.8: Type conversions
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

import Die from '../die.js';

//Type conversions
function typeConv() {
    var die = new Die();

    return `
        falsy values (use double negation)
        !!undefined ➡️ ${!!undefined},
        !!null ➡️ ${!!null},
        !!NaN ➡️ ${!!NaN},

        !!false ➡️ ${!!false},
        !!0 ➡️ ${!!0},
        !!'' ➡️ ${!!''},

        truthy ➡️ ${true && !!1 && !!0.1 && !!'a' && !!{} && !![] && isNaN(NaN)},

        To numeric value (use unary +)
        +null ➡️ ${+null},
        +undefined ➡️ ${+undefined},

        +false ➡️ ${+false},
        +true ➡️ ${+true},

        +'' ➡️ ${+''} (${typeof (+'')}),
        +'3' ➡️ ${+'3'} (${typeof (+'3')}),
        '3' - 0  ➡️ ${'3' - 0} (${typeof ('3' - 0)}),
        '3' + 0  ➡️ ${'3' + 0} (${typeof ('3' + 0)}) ➡️ string concatenation is given precedence over numeric conversion,
        die + 0  ➡️ ${die + 0} (${typeof (die + 0)}) ➡️ toValue is used for the conversion resulting in numeric addition,
        +' 3.14' ➡️ ${+' 3.14'},
        +' 3.14_' ➡️ ${+' 3.14_'},
        +'three' ➡️ ${+'three'},

        To string value (use + with an empty string)
        null + '' ➡️ ${null + ''},
        undefined + '' ➡️ ${undefined + ''},

        false + '' ➡️ ${false + ''},
        true + '' ➡️ ${true + ''},

        3 + ''  ➡️ ${3 + ''} (${typeof (3 + '')}),
        3 - ''  ➡️ ${3 - ''} (${typeof (3 - '')}),
        3 - 'zero'  ➡️ ${3 - 'zero'},
        3.14 + '' ➡️ ${3.14 + ''},
        Math.PI + '' ➡️ ${Math.PI + ''}

    `;
}

function equality() {
    return `
        undefined == null ➡️ ${undefined == null},
        false == undefined ➡️ ${false == undefined},
        false == null ➡️ ${false == null},
        false == NaN ➡️ ${false == NaN},
        NaN == NaN ➡️ ${NaN == NaN},
        false == !!false ➡️ ${false == !!false},
        false == !!undefined ➡️ ${false == !!undefined},
        false == 0 ➡️ ${false == 0},
        false == '' ➡️ ${false == 0}

    `;
}

function strictEquality() {
    return `
        undefined === null ➡️ ${undefined === null},
        false === !!false ➡️ ${false === !!false},
        false === !!undefined ➡️ ${false === !!undefined},
        false === Boolean(false) ➡️ ${false === Boolean(false)},
        false === 0 ➡️ ${false === 0},
        false === '' ➡️ ${false === ''}

    `;
}

function numToStr() {
    var numPiXxl = Math.PI * 1.0e+6;

    return `
        numPiXxl ➡️ ${numPiXxl},

        Number object wrapper methods
        numPiXxl.toFixed(3) ➡️ ${numPiXxl.toFixed(3)},
        numPiXxl.toExponential(3) ➡️ ${numPiXxl.toExponential(3)},
        numPiXxl.toPrecision(3) ➡️ ${numPiXxl.toPrecision(3)},

    `;
}

function strToNum() {
    var strPi = Math.PI.toFixed(2);

    return `
        strPi ➡️ ${strPi},

        Global functions
        parseInt(strPi) ➡️ ${parseInt(strPi)},
        parseFloat(strPi) ➡️ ${parseFloat(strPi)},

        parseFloat(strPi + \' is \u03C0\') ➡️ ${parseFloat(strPi + ' is π')},
        parseFloat(\'\u03C0 is \' + strPi) ➡️ ${parseFloat('π is ' + strPi)},

    `;
}

function arrToStr() {
    return `
        ${[ 'arr', 2, 'string' ].toString()}
        ${[ 'arr', 2, 'string' ].join('➡️ ')}
    `;
}

function getDate() {
    var nowDate = new Date();

    //return nowDate + ''; //cast to string
    //return String(nowDate); //cast to string
    //return nowDate.toString(); //cast to string
    return +nowDate; //cast to number
}

function throwDie() {
    var die = {
        dots: Math.ceil(Math.random() * 6),

        valueOf: function() { return this.dots },
        toString: function() {
            return 'You threw a ' + this.dots
        }
    };

    //return die.toString();
    //return String(die);
    //return die + '';
    //return die.valueOf();
    return +die;
}

export default{
    typeConv,
    equality,
    strictEquality,
    numToStr,
    strToNum,
    arrToStr,
    getDate,
    throwDie
};
