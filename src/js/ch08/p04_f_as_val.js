/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 8.4: A function as a value
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

//Function expression and assignment to a variable
var numSort = (a, b) => a - b;

//Function statement
function rndSort() {
    return Math.random() - 0.5;
}

//Collection of sort functions
var sortFunc = {
    num: numSort, //assigning a function reference to an object property
    numRev: (a, b) => -(a - b),
    str: (a, b) => String(a).localeCompare(b),
    strRev: function(a, b){ return -(String(a).localeCompare(b)) }
};

export default function() {
    var arr = [83, 11, 94, 24, 16, 7];

    //Passing function references as arguments to the sort method
    return `
        Original array: ${arr}
        Sorted array (default): ${[...arr].sort()}

        Sorted array (alphabetical): ${[...arr].sort( sortFunc.str )}
        Sorted array (alphabetical reverse): ${[...arr].sort( sortFunc.strRev )}

        Sorted array (numerical): ${[...arr].sort( sortFunc.num )}
        Sorted array (numerical reverse): ${[...arr].sort( sortFunc.numRev )}

        Sorted array (randomly): ${[...arr].sort( rndSort )}

    `;
};
