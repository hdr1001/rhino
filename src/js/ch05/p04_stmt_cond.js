/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 5.4: Conditionals
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

//if 2x
function isDivisible(num, div) {
    if(typeof num !== 'number' || typeof div !== 'number') {
        throw new TypeError('Both arguments must be numbers')
    }

    if(div === 0) {
        throw new RangeError('Division by zero is not allowed')
    }

    return num % div === 0;
}

//if else
function isDivisibleMsg(num, div) {
    var msg = '';

    if(isDivisible(num, div)) {
        msg = num + ' is divisible by ' + div
    }
    else {
        msg = num + ' is not divisible by ' + div
    }

    return msg;
}

//try-catch-finally & else if
function isDivisibleMsgTry(num, div) {

    console.log('Top of function isDivisibleMsgTry');

    try {
        return isDivisibleMsg(num, div)
    }
    catch (err) {
        if(err instanceof TypeError) {
            return 'TypeError: ' + err.message
        }
        else if(err instanceof RangeError) {
            return 'RangeError: ' + err.message
        }
        else {
            return 'Error: ' + err.message
        }
    }
    finally {
        console.log('About to exit isDivisibleMsgTry');
    }
}

//switch using break
function aSwitch(pIn) {
    var ret = '';

    switch(pIn) {
    case 3:
        ret = 'Number 3';
        break
    case '3':
        ret = 'String \'3\'';
        break;
    case 'three':
        ret = 'String \'three\'';
        break;
    case 4:
    case 5:
        ret = 'Number 4 or 5';
        break;
    default:
        ret = 'Went to default case';
    }

    return ret;
}

//switch using return
function aSwitchv2(pIn) {
    switch(pIn) {
    case 3:
        return 'Number 3';
    case '3':
        return 'String \'3\'';
    case 'three':
        return 'String \'three\'';
    case 4:
    case 5:
        return 'Number 4 or 5';
    }

    return 'Replaces default case';
}

export default {
   isDivisible,
   isDivisibleMsg,
   isDivisibleMsgTry,
   aSwitch,
   aSwitchv2
};
