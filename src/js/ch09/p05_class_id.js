/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 9.5: Constructors and class identity
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

import { typeof_v2 } from '../utils.js';
import { Die } from '../die.js';

//Demo of a more granular implementation of the typeof operator
//Can be compared results of code in src/js/ch03/p04_class_type.js
function sTypeof_v2() {
    var undef;
    var nu11 = null;
    var bool = 1 === 1;
    var num = 42;
    var str = 'foo';

    //NaN (a property of the global object)
    var nan = 'three' / 3; //NaN is of type Number

    return `
        primitive types 
        the type of undefined is ${typeof_v2( undef )}
        the type of null is ${typeof_v2( nu11 )}

        the type of literal true is ${typeof_v2( bool )}
        the type of literal 42 is ${typeof_v2( num )}
        the type of literal \'foo\' is ${typeof_v2( str )}

        NaN, a property of the global object
        the type of NaN is ${typeof_v2( nan )}

        object types, a function
        the type of function f() { return true } is ${typeof_v2( function f() { return true } )}

        object literals
        the type of literal { foo: 'bar' } is ${typeof_v2( { foo: 'bar' } )}
        the type of literal [ 9, 'ten' ] is ${typeof_v2( [ 9, 'ten' ] )}

        language built-in objects
        the type of new Date() is ${typeof_v2( new Date() )}
        the type of literal /foo/i is ${typeof_v2( /foo/i )}
        the type of new Error('❌') is ${typeof_v2( new Error('❌') )}

        user-defined objects
        the type of new Die is ${typeof_v2( new Die )}

    `;
}

//Reworked version of method getName of the Function object, full
//credit to David Flanagan
//Not really a polyfill, but just a useful method and an example
//of JavaScript's dynamic, prototype-based, inheritance mechanism.
//Return the name of a function (may be ""/null for nonfunctions)
if(!Function.prototype.funcName){
    Object.defineProperty(
        Function.prototype,
        'funcName',
        {
            get: function() {
                if('name' in this) return this.name;

                return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
            },
            enumerable: false
        }
    )
}

export default sTypeof_v2;
