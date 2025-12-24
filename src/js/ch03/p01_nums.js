/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3.1: Numbers
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

//Just one number type
function jsNum() {
    var numInt = 42, numFloat = 1.1301;

    return `
        JavaScript only has one numeric type. This type is used for: 
        ➡️ integers (numInt = ${numInt}, type ${typeof numInt})
        ➡️ floating point numbers (numFloat = ${numFloat}, type ${typeof numFloat})

    `;
}

//No errors thrown on over/underflow or division by zero
function noErrs() {
    var NaN_1 = 0/0;
    var NaN_2 = 'three' * 2;

    return `
        division by zero ➡️ ${1/0}
        division by zero (negative numerator) ➡️ ${-1/0}
        zero divided by zero ➡️ ${0/0}
        \'three\' * 2 ➡️ ${'three' * 2}
        NaN === NaN ➡️ ${NaN_1 === NaN_2}
        math.sqrt(-1) ➡️ ${Math.sqrt(-1)}
        Number.MAX_VALUE * 2 ➡️ ${Number.MAX_VALUE * 2}

    `;
}

//Representing decimal fractions using a binary number format
//It is the same in other programming languages (http://bit.ly/41NiNV5)
function f003()
{
   //Declarations section
   var flt1 = 0, flt2 = 0.1;
   var i;

   //Floating point arithmetic can lead to unexpected results
   for(i = 0; i < 1000; i++)
   {
      flt1 += flt2;
   }

   return '1000 * 0.1 = ' + flt1 + ' (or is it?)';
}

//Date object basics
function dateBasics() {
    var dateNow = new Date();
    var dateEpoch = new Date(0);    

    return `
        The current date is ${dateNow}
        The so-called epoch date is ${dateEpoch}
        Number of ms since 1 Jan 1970: ${dateNow - dateEpoch}
         
    `;
}

export default {
    jsNum,
    noErrs,
    f003,
    dateBasics
};
