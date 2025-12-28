/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.9: Relational expressions
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

function equalityOpIsTricky() {
   var objNow = new Date();
   var die = new Die();

   return `
      null == undefined ➡️ ${null == undefined}
      '0' == 0 ➡️ ${'0' == 0}
      0 == false ➡️ ${0 == false}
      '0' == false ➡️ ${'0' == false}
      '0 ' == false ➡️ ${'0 ' == false}
      'z ' == false ➡️ ${'z ' == false}
      1 == true ➡️ ${1 == true}
      '1' == true ➡️ ${'1' == true}
      2 == true ➡️ ${2 == true}
      NaN == NaN ➡️ ${NaN == NaN}
      NaN != NaN ➡️ ${NaN != NaN}
      isNaN(NaN) ➡️ ${isNaN(NaN)}
      objNow == objNow.toString() ➡️ ${objNow == objNow.toString()}
      die == die.valueOf() ➡️ ${die == die.valueOf()}

   `;
}

function refComparison() {
   var refDie_1a = new Die();
   var refDie_1b = refDie_1a;

   var refDie_2 = new Die();

   while(+refDie_1a !== +refDie_2) { refDie_2 = new Die() }

   console.log(`Just checking ➡️ refDie_1a: ${+refDie_1a}, refDie_2: ${+refDie_2}`);
   
   return `
       refDie_1a ===  refDie_1b ➡️ ${ refDie_1a ===  refDie_1b}
       refDie_1a ===  refDie_2  ➡️ ${ refDie_1a ===  refDie_2}
      +refDie_1a === +refDie_2  ➡️ ${+refDie_1a === +refDie_2} 

   `;
}

function comparisonOperators() {
   return `
      10 < 2 ➡️ ${10 < 2}
      10 > 2 ➡️ ${10 > 2}
      10 <= 2 ➡️ ${10 <= 2}
      10 >= 2 ➡️ ${10 >= 2}

      'foo' < 'bar' ➡️ ${'foo' < 'bar'}
      'bao' < 'bar' ➡️ ${'bao' < 'bar'}
      'Foo' < 'bar' ➡️ ${'Foo' < 'bar'}
      'Foo'.toLowerCase() < 'bar' ➡️ ${'Foo'.toLowerCase() < 'bar'}

      '10' < '2' ➡️ ${'10' < '2'}
      '10' > '2' ➡️ ${'10' > '2'}
      '10' <= '2' ➡️ ${'10' <= '2'}
      '10' >= '2' ➡️ ${'10' >= '2'}

      0 > true ➡️ ${0 > true}
      0 <= false ➡️ ${0 <= false}

      10 < '2' ➡️ ${10 < '2'}
      '10' > 2 ➡️ ${'10' > 2}
      'two' < 10 ➡️ ${'two' < 10}
      NaN < 10 ➡️ ${NaN < 10}

      Infinity >= Infinity ➡️ ${Infinity >= Infinity}
      Infinity > Infinity ➡️ ${Infinity > Infinity}
      Infinity > NaN ➡️ ${Infinity > NaN}
      Infinity * Infinity > NaN ➡️ ${Infinity * Infinity > NaN}

      -0 < 0 ➡️ ${-0 < 0}
      -0 <= 0 ➡️ ${-0 <= 0}

   `;
}

export default {
   equalityOpIsTricky,
   refComparison,
   comparisonOperators
};
