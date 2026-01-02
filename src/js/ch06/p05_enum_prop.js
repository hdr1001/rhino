/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.5: Object property enumeration
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

var protoObj = {
    foo: 'Prototype property foo',
    bar: 42
};

var obj = Object.create(protoObj);

obj.bar = 'forty-two';
obj.baz = 'obj own property';

obj.oProp = {
    subProp: 'This is a sub-property',
    toString: function() { return this.subProp.substring(10) }
};

const listProp = prop => `obj['${prop}'] => ${obj[prop]}`;

var arrEnumFunctions = [
    //for ..in loop (lists all enumerable properties, including inherited ones)
    () => { var ret = ''; for(var prop in obj) ret += `obj['${prop}'] => ${obj[prop]}\n`; return ret },

    //Object.keys (lists only own && enumerable properties)
    () => Object.keys(obj).map(listProp).join('\n'),

    //Object.getOwnPropertyNames (Lists all own properties (incl the non-enumerable ones))
    () => Object.getOwnPropertyNames(obj).map(listProp).join('\n')
];

export default function(idxFunc = 0) {
    return arrEnumFunctions[idxFunc]();
}
