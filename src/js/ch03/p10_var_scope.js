/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// More ➡️ https://bit.ly/3LfvOBE
// Chapter 3.10: Variable scope
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

var modGlobal = 'Exported "module" level variable';
var aVar = 0;

//Function with local variable & nested function
function varScope() {
    //Nested function with local variable & access to higher up scopes
    function nestedFunction(fp) {
        var nestedFuncVar = 'Nested function variable';

        return `
            modGlobal ➡️ ${modGlobal}
            funcVar ➡️ ${funcVar}
            fp ➡️ ${fp}
            nestedFuncVar ➡️ ${nestedFuncVar}

        `;
    }

    var funcVar = 'Function level variable with local scope';

    try {
        console.log(`nestedFuncVar ➡️ ${nestedFuncVar}`)
    }
    catch(err) {
        console.error(err.message)
    }

    return nestedFunction('Function parameter');
}

//Function parameters have local scope
try {
//    console.log(`funcVar ➡️ ${funcVar}`) //Generates an error
}
catch(err) {
    console.error(err.message)
}

//Local variable takes precedence over a global or outer function variable
function localPrecedence() {
    //fNested1 is in the lexical scope of function localPrecedence
    function fNested1() { var aVar = 2; return aVar }

    var aVar = 1;

    console.log(`aVar in function localPrecedence ➡️ ${aVar}`);

    return fNested1();
}

//This function is in the global lexical scope
function fOther() { return aVar } //aVar is located in the global scope

//Different lexical scope
function diffLexicalScope() {
    //fNested1 is in the lexical scope of function localPrecedence
    function fNested2() { return aVar } //aVar is located in the scope of diffLexicalScope

    var aVar = 3;

    return  `fNested2() ➡️ ${fNested2()}, fOther() ➡️ ${fOther()}`;
}

//Best explanation of so-called hoisting ➡️ https://www.youtube.com/watch?v=Fd9VaW0M7K4
function hoisting() {
    console.log('hoistVar === undefined ➡️ ' + (hoistVar === undefined));

    var hoistVar = 'Variable will be "hoisted"';

    return hoistVar;
}

export default {
    modGlobal,
    varScope,
    localPrecedence,
    diffLexicalScope,
    hoisting
};
