/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.6: Iterate an array (& delete an element)
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

import globals from '../globals.js';

//Array literal
export default function arrIterate() {
    function doIterate(ret) {
        for(var i = 0; i < arrTypes.length; i++) {
            ret.push(`arrTypes[${i}] => ${arrTypes[i]}`);
        }

        ret.push(' ');

        for(var idx in arrTypes) {
            ret.push(`arrTypes[${idx}] => ${arrTypes[idx]}`);
        }

        ret.push(' ');

        return ret;
    }

    var ret1 = [], ret2 = [];

    const arrTypes = globals.arrTypes.toSpliced(7, 0, '@ idx 7, will be deleted');

    ret1 = doIterate(ret1);

    //Just checking before delete
    console.log(arrTypes[7]); //'@ idx 7, will be deleted'
    console.log(7 in arrTypes); //true

    //Make arrTypes a sparse array by deleting an element
    delete arrTypes[7];

    //Just checking after delete
    console.log(arrTypes[7]); //undefined
    console.log(7 in arrTypes); //false

    ret2 = doIterate(ret2);

    return ret1.concat(ret2).join('\n');
}
