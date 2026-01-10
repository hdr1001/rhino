/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 9.1: Object factory
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

function dieFactory(lang = 'en') {
    //This is what a constructor function would do automatically
    var inst = Object.create(dieFactory.prototype);

    //Initialize the new object
    inst.lang = lang;
    inst.doThrow();

    //The object is returned automatically when using a constructor function
    return inst;
}
/*
console.log('dieFactory.prototype ➡️ ', !!dieFactory.prototype);
console.log('dieFactory.prototype.constructor ➡️ ', !!dieFactory.prototype.constructor);
console.log('dieFactory.prototype.constructor === dieFactory ➡️ ', dieFactory.prototype.constructor === dieFactory);
*/
//Add the shared object logic to the factory function's prototype
dieFactory.prototype.doThrow = function() {
   return this.numDots = Math.floor(Math.random() * 6) + 1;
};

dieFactory.prototype.toString = function() {
   if(this.lang !== 'en') {
      throw new Error('Only English supported');
   }
   else {
      return 'You threw ➡️ ' + this.numDots;
   }
};

dieFactory.prototype.valueOf = function() { return this.numDots };

//The factory at work
export default function(num = 2) {
    if(typeof num !== 'number') { throw new TypeError('Argument must be a number') } 
    if(num < 1 || num > 10) { throw new RangeError('Argument must be larger than 1 and smaller or equal to 10') }

    return Array.from({ length: num }, () => dieFactory()).join('\n');
};
