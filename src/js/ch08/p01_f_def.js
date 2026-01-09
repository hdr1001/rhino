/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 8.1: Function definition
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

var varMod = 'Module level variable', arrRet = [];

//Function hoisting
arrRet.push(`f_statement is hoisted, f_statement('test') ➡️ ${f_statement('test')}`);

//Hoisting does not apply to function expressions
//Variable is hoisted, but not the assignment
arrRet.push(`f_expression is not yet assigned, f_expression ➡️ ${f_expression}`);

//Function definition statement
function f_statement(p) {
    return `Parameter p passed in evaluates to: ${p}`;
}

//Function expression
var f_expression = function(p) {
    return `Parameter p passed in evaluates to: ${p}`;
};

arrRet.push(`f_expression can now be invoked, f_expression('🤓') ➡️ ${f_expression('🤓')}`);

//Function without a return statement
function f_noReturn(p) {
    arrRet.push('Parameter p in f_noReturn evaluates to: ' + p);
}

arrRet.push(`f_noReturn has no return value, f_noReturn() ➡️ ${f_noReturn()}`);

//Nested function
function f_nested() {
    var fScopeVar = 'Variable with function scope';

    function f_inner() {
        return `Accessing ${varMod} and ${fScopeVar} from inner function`;
    }

    //The invocation of f_inner evaluates to the return value of f_inner
    return f_inner();
}

arrRet.push(`f_nested() ➡️ ${f_nested()}`);

try {
    console.log('🤔 ' + fScopeVar);
}
catch(err) {
    arrRet.push('fScopeVar is not accessible at the module level: ' + err.message);
}

export default arrRet.join('\n');
