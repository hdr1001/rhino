/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Functions to demonstrate custom object creation
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

//Constructor function to create Die objects
export function Die(lang) {
   this.lang = lang || 'en';
   this.doThrow();
}

//Log an error in case:
// - Die's prototype property is missing or
// - the constructor property of the prototype does not point back to Die
console.assert(Die.prototype && Die.prototype.constructor === Die,
   { msg: '🤔, what is going on with Die\'s prototype?', Die }
);

//Add the shared object logic to the constructor's prototype
Die.prototype.doThrow = function() {
   return this.numDots = Math.floor(Math.random() * 6) + 1;
};

Die.prototype.toString = function() {
   if(this.lang !== 'en') {
      throw new Error('Only English supported');
   }
   else {
      return 'You threw -> ' + this.numDots;
   }
};

Die.prototype.valueOf = function() { return this.numDots };

//Factory function alternative
export function dieFactory(lang, useObjCreate) {
   var obj;

   if(useObjCreate) {
      //This is what a constructor function would do automatically
      obj = Object.create(Die.prototype);
   }
   else {
      //Lines below are equivalent to what Object.create does
      obj = {};
      Object.setPrototypeOf(obj, Die.prototype);
   }

   //Initialize the object instance
   obj.lang = lang || 'en';
   obj.doThrow();

   //The return statement is not needed when using 'new'
   return obj;
}
