/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3.4: undefined & null
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

function retUndef() {}

function retUndefParam(p1, p2) { console.log(p1); return p2 }

//undefined
function undef() {
    var varUndef, o = {}, arr = ['idx0'], ret = '';
    
    return `
        varUndef              = ${varUndef}
        o.prop                = ${o.prop}
        arr[1]                = ${arr[1]}
        retUndef()            = ${retUndef()}
        retUndefParam(\'🤓\')   = ${retUndefParam('🤓')}`
}

//Undefined equals null?
function undefNull() {
    return `
        undefined == null ➡️ ${undefined == null}
        undefined === null ➡️ ${undefined === null}

    `;
}

export default {
    undef,
    undefNull
};
