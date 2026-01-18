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

import { Die, dieFactory } from '../die.js';

//The factory at work
function factoryAtWork(num = 2) {
    if(typeof num !== 'number') { throw new TypeError('Argument must be a number') } 
    if(num < 1 || num > 10) { throw new RangeError('Argument must be larger than 1 and smaller or equal to 10') }

    return Array.from({ length: num }, () => dieFactory()).join('\n');
}

//The factory at work using Object.create
function factoryObjCreate(num = 2) {
    if(typeof num !== 'number') { throw new TypeError('Argument must be a number') } 
    if(num < 1 || num > 10) { throw new RangeError('Argument must be larger than 1 and smaller or equal to 10') }

    return Array.from({ length: num }, () => dieFactory('en', true)).join('\n');
}

//The Die constructor does the heavy lifting here
function constructorAtWork(num = 2) {
    if(typeof num !== 'number') { throw new TypeError('Argument must be a number') } 
    if(num < 1 || num > 10) { throw new RangeError('Argument must be larger than 1 and smaller or equal to 10') }

    return Array.from({ length: num }, () => new Die).join('\n');
}

export default {
   factoryAtWork,
   factoryObjCreate,
   constructorAtWork
};
