/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3.9: Variable declaration
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

var modLevelThis = this;

function modLevelVars() {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
    try {
        delete [].length //Possible in sloppy mode 🤯
    }
    catch(err) {
        console.error('Caught error: ' + err.message)
    }

    //Strict mode makes it impossible to accidentally create global variables. In sloppy
    //mode, mistyping a variable in an assignment creates a new property on the global
    //object and continues to "work". Assignments which would accidentally create global
    //variables throw an error in strict mode.
    var typo; //Declare variable typo (i.e. not typ0)

    try {
        typ0 = 42; //typ0 is undeclared
    }
    catch(err) {
        console.error('Caught error: ' + err.message)
    }

    //Even in strict mode declaring a variable twice does not raise an error
    var declareDouble;
    var declareDouble = '2x'; //I wouldn't consider this best practice

    return `
        At the top level this is undefined in JavaScript modules ${modLevelThis === undefined ? '✅' : '🤔'}
        The value of the variable declared twice is ${declareDouble} 

    `
}

//Explicitly define a new property on the global object
globalThis.typoo = 43;

export default modLevelVars
