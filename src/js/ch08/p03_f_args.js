/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 8.1: Function arguments
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

//Function with function parameters
function fParams(p1, p2, p3) {
    p2 = p2 || 'bar'; //default value

    return `
        p1 = ${p1}
        p2 = ${p2}
        p3 = ${p3}

    `;
}

//Function with function parameters & ES6 default value
function fParamsES6(p1, p2 = 'def', p3) {
    return `
        p1 = ${p1}
        p2 = ${p2}
        p3 = ${p3}

    `;
}

//Function arguments object
function fArguments(p0, p1 = 'def', p2) {
    var retArr = [];

    retArr.push(`Is arguments an array: ${Array.isArray(arguments)}`);

    retArr.push(`Number of arguments passed in: ${arguments.length}`);

    for(var i = 0; i < arguments.length; i++) {
        retArr.push(`  arguments[${i}] = ${arguments[i]}`);
    }

    retArr.push(' ');

    retArr.push(`arguments[1] === p1 ➡️ ${arguments[1] === p1}`);
    retArr.push(`arguments[1] = ${arguments[1] = 'changed'}`);
    retArr.push(`arguments[1] === p1 ➡️ ${arguments[1] === p1}`);
    retArr.push(`arguments[1] ➡️ ${arguments[1]}`);
    retArr.push(`p1 after changing arguments[1]: ${p1}`);

    retArr.push(' ');

    //arguments.callee is not accessible in strict mode
    try{
        console.log(arguments.callee);
    }
    catch(err) {
        retArr.push(`arguments.callee is not accessible in strict mode: ${err}`);
    }

    return retArr.join('\n');
}

//Passing parameters by value and by reference
function paramPassing(byVal, byRef) {
    byVal = 42;
    byRef.p1 = 'bar';
}

//Test how parameter are passed
function byValOrRef() {
    var primitive = 3.14, obj = { p1: 'foo' };

    paramPassing( primitive, obj );

    return `primitive = ${primitive}, obj.p1 = ${obj.p1}`;
}

//Function declaration with parameter checking
function timesTwo(num) {
    //First check the number of arguments
    if(arguments.length !== 1) {
        throw new Error('Function timesTwo expects exactly one argument');
    }

    //Then check the type of the argument
    if(typeof num !== 'number') {
        throw new TypeError('Argument must be a number')
    }

    return num * 2;
}

//With error handling
function sTimesTwo(num) {
    try {
        return timesTwo(num);
    }
    catch(err) {
        return `${err.constructor.name}: ${err.message}`;
    }
}

export default {
    fParams,
    fParamsES6,
    fArguments,
    byValOrRef,
    sTimesTwo
};
