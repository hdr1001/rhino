/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3.7: Primitive values v. mutable object references
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

//Primitives (booleans, numbers, strings, null & undefined)
//Compared by value
var strOne = 'Example string';
var strTwo = strOne; //Two separate, primitive values

var strThree = strOne; //Also a seperate value
strThree = 'The 3rd string'; //No impact on strOne

//Objects
//Compared by reference
var objOne = { prop: 'Attribute value' };
var objTwo = objOne; //2nd reference to the same object

objTwo.prop = 'Attribute value changed';

var objThree = { prop: 'Attribute value changed' }; //Another object

export default function byValue_v_byRef() {
    return `
        strOne === strTwo ➡️ ${strOne === strTwo}
        strOne === strThree ➡️ ${strOne === strThree}

        objOne === objTwo ➡️ ${objOne === objTwo}
        objOne.prop ➡️ ${objOne.prop}

        objOne === objThree ➡️ ${objOne === objThree}
        objOne.prop === objThree.prop ➡️ ${objOne.prop === objThree.prop}

    `;
}
