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

import { classAttr } from '../utils.js';
import { Die } from '../die.js';

//Function typeof_v2(), full credit to David Flanagan
/*
Return the type of o as a string:
-If o is null, return "null", if o is NaN, return "nan".
-If typeof returns a value other than "object" return that value.
-If the class of o is anything other than "Object", return that.
-If o has a constructor and that constructor has a name, return it.
-Otherwise, just return "Object".
*/
function typeof_v2(o) {
    var t, c, n; //type, class, name

    //Special case for the null value:
    if(o === null) return 'null';

    //Another special case: NaN is the only value not equal to itself:
    if(o !== o) return 'nan';

    //Use typeof for any value other than "object".
    //This identifies any primitive value and also functions.
    if((t = typeof o) !== 'object') return t;

    //Return the class of the object unless it is "Object".
    //This will identify most native objects.
    if((c = classAttr(o)) !== 'Object') return c.toLowerCase();

    //Return the object's constructor name, if it has one
    if(o.constructor && typeof o.constructor === 'function' &&
        (n = o.constructor.getName())) return n.toLowerCase();

    //We can't determine a more specific type, so return "Object"
    return 'object';
}

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

        object types
        the type of literal { foo: 'bar' } is ${typeof_v2( { foo: 'bar' } )}
        the type of literal [ 9, 'ten' ] is ${typeof_v2( [ 9, 'ten' ] )}
        the type of function f() { return true } is ${typeof_v2( function f() { return true } )}

        the type of new Date() is ${typeof_v2( new Date() )}
        the type of literal /foo/i is ${typeof_v2( /foo/i )}
        the type of new Error('❌') is ${typeof_v2( new Error('❌') )}
        the type of new Die is ${typeof_v2( new Die )}

    `;
}

//Method getName of a Function object, full credit to David Flanagan
//Return the name of a function (may be "") or null for nonfunctions
if(!Function.prototype.getName){
    Function.prototype.getName = function() {
        if('name' in this) return this.name;

        return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
    };
}

export default sTypeof_v2;
