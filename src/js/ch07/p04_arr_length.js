/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.4: Array length
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

import Die from '../die.js';

function logArr(arr) {
    return `Array content is [${arr.join(', ')}], arr.length = ${arr.length}`;
}

//Array literal
export default function arrLength() {
    var arrRet = [];

    var arr = [ +(new Die), +(new Die), +(new Die) ];

    arrRet.push(logArr(arr));

    arr[arr.length] = +(new Die); //add new element

    arrRet.push(logArr(arr)); //Note that the length was automatically adjusted!

    arr.length = 1000; //create a sparse array

    //Determine how many elements are defined and how many are sparse
    var objCountIn = { in: 0, sparse: 0 };

    for(var i = 0; i < arr.length; i++) {
        if(i in arr)
            objCountIn.in++;
        else
            objCountIn.sparse++;
    }
    
    arrRet.push(`Array has ${objCountIn.in} defined elements and ${objCountIn.sparse} sparse slots.`);

    arr.length = 2; //truncate the array using the length property

    arrRet.push(logArr(arr));

    return arrRet.join('\n');
}
