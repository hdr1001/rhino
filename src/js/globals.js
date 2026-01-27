/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Modern global constants and variables
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

import { Die } from './die.js';

var example = { level: 42 };

//Array literal
var arrTypes = [ //Array with different types of elements
    null,
    undefined,
    true,
    3.14,
    'A string',
    { x: 1, y: 2 }, //Object literal,
    [1, 2, 3], //Array literal
    function() { return 'An anonymous function' },
    new Die() //Instance of the Die constructor function
];

const joinSep = ', ';

const delimSep = '|';

export default {
    example,
    arrTypes,
    joinSep,
    delimSep
};
