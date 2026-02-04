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

import globals from '../globals.js';
import { Die } from '../die.js';

var moduleLevelVar = 1.1301;

//Global and module level variables
function globalModuleLevelVars() {
    try {
        console.log('This variable does not exist ➡️ ' + doesNotExist);
    }
    catch(err) {
        console.error(err.constructor.name + ': ' + err.message);
    }

    var ret = 'globals.example.level = ' + globals.example.level.toString();

    ret += ', moduleLevelVar = ' + moduleLevelVar.toFixed(2);

    return ret;
}

//JavaScript variable types
//ES6: https://262.ecma-international.org/6.0/#sec-typeof-operator
//EcmaScript 2020 defines 7 primitive types:
//Undefined, Null, Boolean, Number, String, Symbol and BigInt
function jsTypes() {
    var undef;
    var nu11 = null;
    var bool = 1 === 1;
    var num = 42;
    var str = 'foo';

    //NaN (a property of the global object)
    var nan = 'three' / 3; //NaN is of type Number

    return `
        primitive types 
        the type of undefined is ${typeof undef}
        the type of null is ${typeof nu11}

        the type of literal true is ${typeof bool}
        the type of literal 42 is ${typeof num}
        the type of literal \'foo\' is ${typeof str}

        NaN, a property of the global object
        the type of NaN is ${typeof nan}

        object types
        the type of literal { foo: 'bar' } is ${typeof { foo: 'bar' }}
        the type of literal [ 9, 'ten' ] is ${typeof [ 9, 'ten' ]}
        the type of function f() { return true } is ${typeof function f() { return true }}

        the type of new Date() is ${typeof new Date()}
        the type of literal /foo/i is ${typeof /foo/i}
        the type of new Error('❌') is ${typeof new Error('❌')}
        the type of new Die is ${typeof new Die}

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
