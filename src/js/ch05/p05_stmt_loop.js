/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 5.5: Loop
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
 
var oLegalAddr = {
    language: 'de',
    addressLines: [
        'Neue Mainzer Straße 46-50'
    ],
    addressNumber: null,
    addressNumberWithinBuilding: null,
    city: 'Frankfurt am Main',
    region: 'DE-HE',
    country: 'DE',
    postalCode: '60311'
};

var arrBic = [
    'SGEFDEFFXXX',
    'SGEGDEF1XXX',
    42
];

//while
function loopWhile() {
    var ret = '', i = 65; //65 is the ASCII code for 'A'

    while(i < 91) {
        ret += String.fromCharCode(i++);
    }

    return ret;
}

//do while
function loopDoWhile() {
    var ret = '', chrCodeStart = 'Z'.charCodeAt(0)
    var i = 0;

    do
        ret += String.fromCharCode(chrCodeStart - i++);
    while(i < 26);

    return ret;
}

//for
function loopFor() {
    var ret = '';

    for(var i = 97; i <= 122; i++) { //97 is 'a', 122 is 'z'
        ret += String.fromCharCode(i);
    }

    console.log('i = ' + i); //i does not have block level scope

    return ret;
}

function loopForv2() {
    var ret = '';

    for(var charCode_z = 'z'.charCodeAt(0), i = 0; i < 26; i++)
        ret += String.fromCharCode(charCode_z - i);

    return ret;
}

//for in
function loopForIn() {
    var ret = '';

    for(var prop in oLegalAddr) {
        ret += prop + ': ' + oLegalAddr[prop] + '\n';
    }

    ret += '\n';

    for(var idx in arrBic) {
        ret += idx + ': ' + arrBic[idx] + '\n';
    }

    return ret;
}

function loopForInLVal() {
    var arr = [], i = 0;

    for(arr[i++] in oLegalAddr) /* empty */;

    return arr.join(', ');
    //return Object.keys(oLegalAddr).join(', ');
}

export default {
   loopWhile,
   loopDoWhile,
   loopFor,
   loopForv2,
   loopForIn,
   loopForInLVal
};
