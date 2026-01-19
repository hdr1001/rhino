/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 9.2: Object class identity
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

import { Die, dieFactory } from '../die.js';

//Instance class identity
export function instanceClassIdentity() {
    var arrRet = [];

    var newDie = new Die;
    var factDie = dieFactory();

    //Even though both objects are created in different ways,
    //they are both instances of the Die class
    arrRet.push(`newDie instanceof Die ➡️ ${newDie instanceof Die}`);
    arrRet.push(`factDie instanceof Die ➡️ ${factDie instanceof Die}`);

    //This is because they share the same prototype
    arrRet.push(' ');
    arrRet.push(`Object.getPrototypeOf(newDie) === Object.getPrototypeOf(factDie) ➡️ ${Object.getPrototypeOf(newDie) === Object.getPrototypeOf(factDie)}`);

    //The constructor property on the prototype points, for both instances, to the Die function
    arrRet.push(' ');
    arrRet.push(`newDie.constructor === Die ➡️ ${newDie.constructor === Die}`);
    arrRet.push(`factDie.constructor === Die ➡️ ${factDie.constructor === Die}`);

    //Confirming the name of the constructor function
    arrRet.push(' ');
    arrRet.push(`Object.getPrototypeOf(newDie).constructor.name ➡️ ${Object.getPrototypeOf(newDie).constructor.name}`);
    arrRet.push(`Object.getPrototypeOf(factDie).constructor.name ➡️ ${Object.getPrototypeOf(factDie).constructor.name}`);

    return arrRet.join('\n');
}
