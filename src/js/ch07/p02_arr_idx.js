/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.2: Array element access
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

import globals from '../globals.js';

const getArrTypes = () => globals.arrTypes;

export default function arrIdx() {
    const arrRet = [];

    const arrTypes = globals.arrTypes;

    for(var i = 0; i < arrTypes.length; i++) {
        arrRet.push(`arrTypes[${i}] => ${arrTypes[i]}`);
    }

    arrRet.push(' ');

    arrRet.push(`arrTypes[Math.floor(arrTypes[3]) + 1] => ${arrTypes[Math.floor(arrTypes[3]) + 1]}`);

    arrRet.push(`arrTypes[5].x => ${arrTypes[5].x}`);

    arrRet.push(`arrTypes[arrTypes[5].x] => ${arrTypes[arrTypes[5].x]}`);

    arrRet.push(`getArrTypes()[4] => ${getArrTypes()[4]}`);

    arrRet.push(`arrTypes[7]() => ${arrTypes[7]()}`);

    arrRet.push(`arrTypes[100] => ${arrTypes[100]}`);

    arrRet.push(`arrTypes[-1] => ${arrTypes[-1]}`);

    arrRet.push(' ');

    arrRet.push(`arrTypes.length => ${arrTypes.length}`);

    arrTypes[arrTypes.length] = 'Adding an element is easy';

    //Accessing the (added) last element
    arrRet.push(`arrTypes[arrTypes.length - 1] => ${arrTypes[arrTypes.length - 1]}`);

    arrRet.push(`arrTypes.length => ${arrTypes.length}`);

    return arrRet.join('\n');
};
