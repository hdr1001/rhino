/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.6: Object property getters and setters
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

//Example legal entity data in JSON format
const jsonLglEnts = [
`{
    "name": "Heineken Brouwerijen B.V.",
    "isoCtry": "NL",
    "regNums": [
        {
            "regNum": "33050541",
            "code": "NL_KVK_CD"
        },
        {
            "regNum": "NL001632516B01",
            "code": "NL_VAT_CD"
        }
    ]
}`,`{
    "name": "Inbev Belgium",
    "isoCtry": "BE",
    "regNums": [
        {
            "regNum": "0433666709",
            "code": "BE_OND_CD"
        },
        {
            "regNum": "BE0433666709",
            "code": "BE_VAT_CD"
        }
    ]
}`
];

//Listing of value added tax codes
const vatCodes = [
    { isoCtry: 'NL', code: 'NL_VAT_CD' },
    { isoCtry: 'BE', code: 'BE_VAT_CD' }
];

//Function to get the VAT code for a specific country
vatCodes.forCtry = function(isoCtry) {
    var arrVatCode = this.filter(vatCode => vatCode.isoCtry === isoCtry);
    
    if(arrVatCode.length) return arrVatCode[0].code;

    throw new Error('No VAT code found for country: ' + isoCtry);
};

//Extract the VAT out of an array of registration numbers
function getVat(arrRegNums, vatCode) {
    var arrRegNum = arrRegNums.filter(regNum => regNum.code === vatCode);

    if(arrRegNum.length) return arrRegNum[0].regNum;

    throw new Error('No VAT number found for code: ' + code);
}

var lglEntProto = {
    get vat() { //getter for VAT number
        try {
            if(!(this && this.le)) throw new Error('No legal entity data available');

            if(this.le.regNums && this.le.regNums.length) {
                return getVat(this.le.regNums, vatCodes.forCtry(this.le.isoCtry));
            }

            throw new Error('No registration numbers available')
        }
        catch(err) {
            console.error(err.message);

            return '';
        }
    }
};

function objCreate(idx = 0) {
    var lglEntity = Object.create(lglEntProto);

    lglEntity.le = JSON.parse(jsonLglEnts[idx]);

    return lglEntity.vat || 'No VAT available';
}

function objSetProto(idx = 0) {
    var lglEntity = { le: JSON.parse(jsonLglEnts[idx]) };

    Object.setPrototypeOf(lglEntity, lglEntProto);

    return lglEntity.vat || 'No VAT available'; 
}

export default {
    objCreate,
    objSetProto
};
