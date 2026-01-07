/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.9: ES6 array methods 
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

import { LEIs } from '../../assets/data/LEIs.js';

//For each
function arrForEach() {
    var arrRet = [];

    [ 1, 2, 3 ].forEach( elem => arrRet.push( elem * 2 ) );

    return arrRet.join('\n');
}

//Constructor function BasicLEI
function BasicLEI( lei, name, city, country ) {
    this.lei     = lei;
    this.name    = name;
    this.city    = city;
    this.country = country;
}

BasicLEI.prototype.toString = function() {
    return `LEI ${this.lei} ➡️ ${this.name}, ${this.city} (${this.country})`
}

//Array map
const arrMapSimple = () => LEIs.map( elem => elem.data.id ).join('\n');

const arrMapCustObj = () =>
    LEIs.map(elem => new BasicLEI( 
        elem.data.id,
        elem.data.attributes.entity.legalName.name,
        elem.data.attributes.entity.legalAddress.city,
        elem.data.attributes.entity.legalAddress.country,
    )).join('\n');

//Array filter chained with map
function arrFilter() {
    return LEIs
        .filter(elem => elem.data.attributes.entity.legalAddress.country.toLowerCase() === 'nl' )
        .map(elem => new BasicLEI( 
            elem.data.id,
            elem.data.attributes.entity.legalName.name,
            elem.data.attributes.entity.legalAddress.city,
            elem.data.attributes.entity.legalAddress.country,
        )).join('\n');
}

//Array some & every
function arrSomeEvery() {
    var bEvery = LEIs.every(elem => elem.data.attributes.entity.legalAddress.country.toLowerCase() === 'nl');
    var bSome  = LEIs.some(elem => elem.data.attributes.entity.legalAddress.country.toLowerCase() === 'nl');

    return `Are all LEIs Dutch ➡️ ${bEvery ? 'yes' : 'no'} (but it is ${bSome} that some are).`;
}

//Array reduce
function arrReduce() {
    var oRet = LEIs.reduce( 
        (accu, elem) => {
            if(accu[elem.data.attributes.entity.legalAddress.country])
                accu[elem.data.attributes.entity.legalAddress.country]++
            else
                accu[elem.data.attributes.entity.legalAddress.country] = 1;

            return accu;
        },
        {}
    );

    return Object.keys(oRet).map(elem => `${elem} = ${oRet[elem]}`).join('\n');
}

//Array indexOf and find
function arrIndexOf() {
    var arr = [ -608, -32, 0, 42, 702, 1024 ];

    var fLargerThanZero = elem => elem > 0;

    return `
        Found value 702 at index ${arr.indexOf( 702 )}

        Found the first array value larger than 0 at index ${arr.findIndex(fLargerThanZero)}
        First array value larger than 0 is ${arr.find(fLargerThanZero)}

    `
}

export default {
    arrForEach,
    arrMapSimple,
    arrMapCustObj,
    arrFilter,
    arrSomeEvery,
    arrReduce,
    arrIndexOf
};
