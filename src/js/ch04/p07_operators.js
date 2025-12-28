/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.7: Operators
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

var a = 1;
var b = 2;
var c = '3';
var d = 'foo';
var e = 'bar';
var f;
var obj = { x: 1, y: 2, z: 'foo' };

function operatorOverview() {
   //Highest precedence at the top
   return `
      ++a:          ${++a}
      --b:          ${--b}
       -a:          ${-a}
       +c:          ${+c}
      !true:        ${!true}
      delete obj.y: ${delete obj.y} (JSON.stringify(obj): ${JSON.stringify(obj)})
      typeof +c:    ${typeof +c}

      a * 3:    ${a * 3}
      7 / a:    ${7 / a}
      8 % 3:    ${8 % 3}

      a + b:    ${a + b}
      a + +c:   ${a + +c}
      a + c:    ${a + c} (${typeof (a + c)})
      c - b:    ${c - b} (${typeof (c - b)})

      a < b:    ${a < b}
      a <= b:   ${a <= b}
      a > b:    ${a > b}
      a >= b:   ${a >= b}
      d < e:    ${d < e}
      d <= e:   ${d <= e}
      d > e:    ${d > e}
      d >= e:   ${d >= e}
      obj instanceof Object: ${obj instanceof Object}
      obj instanceof Array:  ${obj instanceof Array}
      \'x\' in obj:  ${'x' in obj}

      a == b:   ${a == b}
      3 == c:   ${3 == c}
      a != b:   ${a != b}
      a === b:  ${a === b}
      3 === c:  ${3 === c}
      a !== b:  ${a !== b}

      Math.random() > 0.5 ? '📉': '📈' ➡️ ${Math.random() > 0.5 ? '📉': '📈'}

      f = 42: ${f = 42}
      f:      ${f}
      f += 2: ${f += 2}
      f -= 8: ${f -= 8}
      f *= 2: ${f *= 2}
      f /= 4: ${f /= 4}
      f %= 5: ${f %= 5}

   `;
}

function precedence() {
   var arr = [1, 2, 3];

   //Operator precedence
   return `
      1 + 2 * 3: ${1 + 2 * 3}

      (1 + 2) * 3: ${(1 + 2) * 3}

      typeof arr[0]: ${typeof arr[0]}

   `;
}

function associativity() {
   var a = 1, b, c;

   //Right to left associativity
   c = b = a + 2;

   return 'c = ' + c;
}

function increment() {
   //Pre-increment
   var xpre = 1;
   var ypre = ++xpre;

   //Postfix increment
   var xpost = 1;
   var ypost = xpost++;

   return `
      xpre : ${xpre},  ypre: ${xpre}
      xpost: ${xpost}, ypost: ${ypost}
      
   `;
}

function trickyJS() {
   //Examples of JavaScript being tricky 
   var x1 = '1';
   var y1 = '1';

   return `
      12 + 2 + ' is on JC\'s jersey': ${12 + 2 + ' is on JC\'s jersey'}
      12 + (2 + ' is not on JC\'s jersey'): ${12 + (2 + ' is not on JC\'s jersey')}

      ++x1: ${++x1}
      y1 + 1: ${y1 + 1}

   `;
}

export default {
   operatorOverview,
   precedence,
   associativity,
   increment,
   trickyJS
};
