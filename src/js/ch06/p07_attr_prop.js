/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.7: Object property attributes
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

//Customized version of the doThrow method that uses defineProperty to change numDots
function doThrow() {
    Object.defineProperty(this, 'numDots', { value: Math.floor(Math.random() * 6) + 1 });
}

export default function() {
    //Instantiate a die object
    var die = new Die;

    const arrRet = [];

    //Property descriptor of the numDots property
    arrRet.push(`Object.getOwnPropertyDescriptor(die, 'numDots'): 
${JSON.stringify(Object.getOwnPropertyDescriptor(die, 'numDots'), null, 3)}
    `);

    arrRet.push('die properties: ');
    for(var prop in die) {
        arrRet.push(' - ' + prop + (die.hasOwnProperty(prop) ? ' (own)' : ' (inherited)'))
    }

    //Change the numDots property
    die.numDots = 7;

    arrRet.push(`\ndie.numDots: ${die.numDots} 🤔`);

    //Version of the die object with non-writable numDots property
    var die_v2 = Object.defineProperties(new Die, {
        numDots: { writable: false, enumerable: false },
    });

    //Inspect the initial value of numDots
    arrRet.push(`\ndie_v2.numDots: ${die_v2.numDots}`);

    //Property numDots is no longer enumerable
    arrRet.push('\ndie_v2 properties: ');
    for(var prop in die_v2) {
        arrRet.push(' - ' + prop + (die_v2.hasOwnProperty(prop) ? ' (own)' : ' (inherited)'))
    }

    //Property numDots of die_v2 is not writable
    try {
        die_v2.numDots = 7;

        arrRet.push(`\ndie_v2.numDots: ${die_v2.numDots}`);
    }
    catch(err) {
        arrRet.push('\n' + err.constructor.name + ': ' + err.message);
    }

    //Will also fail because numDots is not writable
    try {
        die_v2.doThrow();

        arrRet.push(`\ndie_v2.numDots: ${die_v2.numDots}`);
    }
    catch(err) {
        arrRet.push('\n' + err.constructor.name + ': ' + err.message);
    }

    //Shadow function doThrow on the prototype by binding a customized version
    //of the function (see above) to the object instance
    die_v2.doThrow = doThrow.bind(die_v2);

    //Now this works because doThrow uses defineProperty to change numDots
    die_v2.doThrow();

    arrRet.push(`\ndie_v2.numDots: ${die_v2.numDots}`);

    return arrRet.join('\n');
}
