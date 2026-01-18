/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.6: Object creation expressions
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

/*
   When an object creation expression is evaluated, JavaScript
   creates:
      1. a new empty object, just like the one created by the object
         initializer {}. Next, 
      2. it sets the internal prototype property (__proto__) of the
         new object instance to the prototype object of the constructor
         function. The prototype object is the value of the prototype
         property of the constructor function. Next,
      3. it invokes the constructor function with the specified
         arguments, passing the new object as the value of the
         this keyword. The function can then use the this reference
         to initialize the properties of the newly created object.
         Lastly,
      4. Functions written for use as constructors do not (explicitly)
         return a value. The object creation expression evaluates to
         the newly created & initialized object instance.
*/

export function throw2Dice() {
   //Two object creation expressions
   var die1 = new Die();
   var die2 = new Die();

   //Die is a constructor function
   console.log(`typeof Die = ${typeof Die}`);
   console.log(`typeof Die.prototype = ${typeof Die.prototype}`);
   console.log(`Object.keys(Die.prototype) ➡️ ${Object.keys(Die.prototype)}`);

   //Objects created using a new expression have a constructor property
   console.log(`die1.constructor === Die ➡️ ${die1.constructor === Die}`);
   console.log(`die1.constructor.prototype === Die.prototype ➡️ ${die1.constructor.prototype === Die.prototype}`);

   //Available information/functionality on object instances
   console.log(`die1.numDots ➡️ ${die1.numDots}`); //On object instance
   console.log(`die1.hasOwnProperty('numDots') ➡️ ${die1.hasOwnProperty('numDots')}`);
   
   console.log(`die1.toString() ➡️ ${die1.toString()}`); //On Die.prototype
   console.log(`die1.hasOwnProperty('toString') ➡️ ${die1.hasOwnProperty('toString')}`);
   
   console.log(`die1.hasOwnProperty('hasOwnProperty') ➡️ ${die1.hasOwnProperty('hasOwnProperty')}`); //On Object.prototype
   console.log(`Object.prototype.hasOwnProperty('toLocaleString') ➡️ ${Object.prototype.hasOwnProperty('toLocaleString')}`);
   
   //ECMAScript 5 functionality
   console.log(`Die.prototype.isPrototypeOf(die1) ➡️ ${Die.prototype.isPrototypeOf(die1)}`);
   console.log(`Object.prototype.isPrototypeOf(die1) ➡️ ${Object.prototype.isPrototypeOf(die1)}`);
   console.log(`Object.getPrototypeOf(die1) === Die.prototype ➡️ ${Object.getPrototypeOf(die1) === Die.prototype}`);
   console.log(`Object.getPrototypeOf(Die.prototype) === Object.prototype ➡️ ${Object.getPrototypeOf(Die.prototype) === Object.prototype}`);

   //Non-standard functionality
   console.log(`die1.__proto__ === Die.prototype ➡️ ${die1.__proto__ === Die.prototype}`);

   var obj = die1;

   console.log('\nThe prototype chain of die1:');
   do {
      console.log(`Object constructor ${obj.constructor.name}`);
      obj = Object.getPrototypeOf(obj);
   } while(obj);

   return `${die1} and ${die2}`;
}

//       die
//  Object instances
// -                 -
// |      die1       |
// | numDots: 5      |       
// | lang: 'en'      |
// |                 | 
// | constructor: -> | ----------->         Die                            Object
// |                 |    |         Constructor function            Constructor function
// | __proto__: ->   | -------|     {                  }          {                       }
// -                 -    |   |---> { prototype: {     }    |---> { prototype: {          }
//                        |   |     {   doThrow: f()   }    |     {   toString: f()       }
//                        |   |     {   toString: f()  }    |     {   valueOf: f()        }
// -                 -    |   |     {   valueOf: f()   }    |     {   hasOwnProperty: f() }
// |      die2       |    |   |     { }                }    |     { }                     }
// | numDots: 3      |    |   |     { __proto__: ->    } ---|     { __proto__: null       }
// | lang: 'en'      |    |   |
// |                 |    |   |
// | constructor: -> | ---|   |
// |                 |        |
// | __proto__: ->   | -------|
// -                 -
