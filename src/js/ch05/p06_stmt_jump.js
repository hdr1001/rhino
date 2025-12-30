/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 5.6: Continue & break
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

//Continue
function loopContinue() {
    var ret = '';

    var chrStart = 'a'.charCodeAt(0);
    var chrStop  = 'z'.charCodeAt(0);
    var chrSkip  = 'd'.charCodeAt(0);

    for(var i = chrStart; i <= chrStop; i++) {
        if(i === chrSkip) {
            ret += ' ';

            continue; //back to the top of the loop
        }

        ret += String.fromCharCode(i);
    }

    return ret;
}

//Break
function loopBreak() {
    var ret = '';

    var chrStart = 'A'.charCodeAt(0);
    var chrStop  = 'Z'.charCodeAt(0);
    var chrExit  = 'D'.charCodeAt(0);

    for(var i = chrStart; i <= chrStop; i++) {
        if(i === chrExit) break; //Jump out of the loop

        ret += String.fromCharCode(i);
    }

    return ret;
}

export default {
    loopContinue,
    loopBreak
};
