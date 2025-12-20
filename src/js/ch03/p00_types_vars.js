/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3: Types, Values and Variables
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

import { globalConsts as globals } from '../globals.js';

var moduleLevelVar = 1.1301;

//Global and module level variables
function globalModuleLevelVars() {
    try {
        console.log('This variable does not exist ➡️ ' + doesNotExist);
    }
    catch(err) {
        console.error(err.constructor.name + ': ' + err.message);
    }

    var ret = 'globals.level = ' + globals.level.toString();

    ret += ', moduleLevelVar = ' + moduleLevelVar.toFixed(2);

    return ret;
}

//JavaScript variable types
function jsTypes() {
    return `
        primitive types 
        the type of literal 42 is ${typeof 42}
        the type of literal \'foo\' is ${typeof 'foo'}
        the type of literal true is ${typeof true}

        the type of null is ${typeof null}
        the type of undefined is ${typeof undefined}

        object types
        the type of literal { foo: 'bar' } is ${typeof { foo: 'bar' }}
        the type of literal [ 9, 'ten' ] is ${typeof [ 9, 'ten' ]}
        the type of function f() { return true } is ${typeof function f() { return true }}

        the type of new Date() is ${typeof new Date()}
        the type of literal /foo/i is ${typeof /foo/i}
        the type of new Error('❌') is ${typeof new Error('❌')}

    `;
}

//JavaScript variables
function jsVariables() {
    //Variable declaration
    var jsVar;

    //Variable declaration and initialization
    var jsStr = 'foo';

    //JavaScript variables are untyped
    var jsUntyped = 42;

    jsUntyped = { foo: 'bar' }; //Not possible in typed languages

    return `
        The value of jsVar is ${jsVar}
        The value of jsStr is ${jsStr}
        The value of jsUntyped is ${jsUntyped.foo}

    `;
}

export default {
    globalModuleLevelVars,
    jsTypes,
    jsVariables
};
