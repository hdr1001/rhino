/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Utility functions
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

//The class attribute
const classAttr = obj => Object.prototype.toString.call(obj).slice(8, -1);

//Convert null or undefined to an empty string
const nullUndefToEmptyStr = elem => elem == null ? '' : elem;

//ISO 8601 UTC Z date/time string to YYYYMMDD or YYMMDD
function sDateIsoToYYYYMMDD (sDateIso, length = 8) {
    return typeof sDateIso === 'string'
        ? sDateIso.split('T')[0].replace(/-/g,'').slice(length * -1)
        : '';
}

//Function typeof_v2(), full credit to David Flanagan
//Made minor modifications though.
/*
Return the type of o as a string:
-If o is null, return "null", if o is NaN, return "nan".
-If typeof returns a value other than "object" or "function",
 i.e. undefined, boolean, number, string(, symbol & bigint),
 then return that value.
-For object types, try to return `${sObjType}, ${c}` where
 -c is the value of string sFunction for functions. 
 -c is the class of o if it is anything other than "Object".
 -c is the instance constructor if the constructor has a name.
-Otherwise, just return the value of string sObjType.
*/
function typeof_v2(o) {
    const sObjType = 'object', sFunction = 'Function';

    const objType = c => `${sObjType}, ${c}`;

    let t, objClass, cn; //type, class, name

    //Special case for the null value:
    if(o === null) return 'null';

    //Another special case: NaN is the only value not equal to itself:
    if(o !== o) return 'nan';

    //Use typeof for any value other than "object".
    //This identifies any primitive value and also functions.
    if((t = typeof o) !== 'object' && t !== 'function')
        return t;

    //Return "object, Function" for functions
    if(t === 'function') return objType(sFunction);

    //Return the class of the object unless it is "Object".
    //This will identify most native objects.
    if((objClass = classAttr(o)) !== 'Object')
        return objType(objClass);

    //Return the object's constructor name, if it has one
    if(o.constructor && typeof o.constructor === 'function' &&
        (cn = o.constructor.funcName)) return objType(cn);

    //We can't determine a more specific type, so return "object"
    return sObjType;
}

export {
    classAttr,
    nullUndefToEmptyStr,
    sDateIsoToYYYYMMDD,
    typeof_v2
};
