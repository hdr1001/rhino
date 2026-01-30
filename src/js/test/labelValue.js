/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Test code
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
import { entLegalForms } from '../../assets/codes/entityLegalForms.js';
import { entRegistrationAuths as entRegAuth } from '../../assets/codes/entityRegAuths.js';
import globals from '../globals.js'
import { nullUndefToEmptyStr, sDateIsoToYYYYMMDD } from '../utils.js';

function leiAddrToStr() {
    let arrLegalAddr;

    if(Array.isArray(this.addressLines) && this.addressLines.length) {
        arrLegalAddr = Array.from(this.addressLines)
    }
    else {
        arrLegalAddr = [];
    }

    arrLegalAddr.push(this.postalCode);

    arrLegalAddr.push(this.city);

    arrLegalAddr.push(this.region);

    arrLegalAddr.push(this.country);

    return arrLegalAddr.filter(elem => elem != null).join(globals.joinSep);
}

function leiAddrSameAs(otherAddr) {
    return Array.isArray(this.addressLines) && Array.isArray(otherAddr.addressLines) &&
        this.addressLines.length && otherAddr.addressLines.length &&
        this.addressLines[0] === otherAddr.addressLines[0]
}

//Constructor function for level 1 LEI data
function level1LEI(objLEI) {
    //Data shortcuts
    ({ meta: this.meta, data: this.data } = objLEI);

    if(this.data) ({ attributes: this.attributes, relationships: this.relationships } = this.data);

    if(this.attributes) ({ entity: this.entity } = this.attributes);

    //Object functionality
    if(this.entity?.otherNames) {
        const otherNames = this.entity.otherNames;

        otherNames.toString = () => otherNames.map(elem => elem.name).join(globals.joinSep);
    }

    if(this.entity?.legalAddress) {
        const legalAddr = this.entity.legalAddress;

        legalAddr.toString = leiAddrToStr;
        legalAddr.leiAddrSameAs = leiAddrSameAs;
    }

    if(this.entity?.headquartersAddress) {
        const hqAddr = this.entity.headquartersAddress;

        hqAddr.toString = leiAddrToStr;
        hqAddr.leiAddrSameAs = leiAddrSameAs;
    }
}

//A template for producing a record consisting of label/value pairs
Object.defineProperty(level1LEI.prototype, 'toLabelValueRec', {
    get: function() {
        return [
            new LabelValue( 'LEI', this.attributes?.lei ),
            new LabelValue( 'Name', this.entity?.legalName?.name ),
            new LabelValue( 'Other names', this.entity?.otherNames ),
            new LabelValue( 'Legal address', this.entity?.legalAddress),
            this.entity?.legalAddress && this.entity.legalAddress.leiAddrSameAs(this.entity?.headquartersAddress)
                ? null
                : new LabelValue( 'HQ address', this.entity?.headquartersAddress),
            new LabelValue( 'Legal form', entLegalForms.get(this.entity?.legalForm?.id)?.desc || this.entity?.legalForm?.id ),
            new LabelValue( 'Registration number', this.entity?.registeredAs ),
            new LabelValue( 'Registered at', entRegAuth.get(this.entity?.registeredAt?.id)?.desc || this.entity?.registeredAt?.id ),
            new LabelValue( 'Status', this.entity?.status ),
            new LabelValue( 'Published on', sDateIsoToYYYYMMDD(this.meta?.goldenCopy?.publishDate))
        ].filter(elem => elem !== null);
    }
});

//Combine different name values for delimited output
level1LEI.prototype.delimNames = function(idx = 0) {
    //Give the legal name the highest priority
    if(idx === 0) return this.entity?.legalName?.name;

    //... followed by other names
    let numOtherNames = this.entity?.otherNames?.length;

    if(numOtherNames && idx <= numOtherNames) return this.entity.otherNames[idx - 1].name;

    if(typeof numOtherNames !== 'number') numOtherNames = 0;

    //... followed by transliterated names
    const numTransliteratedOtherNames = this.entity?.transliteratedOtherNames?.length;

    if(numTransliteratedOtherNames && idx <= numOtherNames + numTransliteratedOtherNames) {
        return this.entity.transliteratedOtherNames[idx - 1 - numOtherNames].name
    }

    return '';
}

//Compose an address for delimited output
level1LEI.prototype.delimAddr = function(addr, addrAttribs) {
    //Handle the edge case that no address data is available
    if(!addr) {
        const len = addrAttribs.reduce((accu, attrib) => accu + (attrib.num ? attrib.num : 1), 0);

        return Array.from({ length: len }, () => undefined);
    }

    //Convert the address object attributes to an array
    return addrAttribs.reduce((accu, attrib) => {
            if(attrib.num) {
                for(let i = 0; i < attrib.num; i++) {
                    accu.push(addr[attrib.prop]?.[i])
                }
            }
            else {
                accu.push(addr[attrib.prop])
            }

            return accu;
        },
        []
    );
}

//A template for producing a delimited string
Object.defineProperty(level1LEI.prototype, 'toDelimStrRec', {
    get: function() {
        let arrRet = [];

        arrRet.push( this.delimNames(0) );
        arrRet.push( this.delimNames(1) );
        arrRet = arrRet.concat( this.delimAddr(
            this.entity?.legalAddress,
            [
                { prop: 'addressLines', num: 2},
                { prop: 'postalCode' },
                { prop: 'city' },
                { prop: 'region' },
                { prop: 'country' },
            ]
        ) );
        arrRet.push( this.attributes?.lei );
        arrRet.push( entLegalForms.get(this.entity?.legalForm?.id)?.desc || this.entity?.legalForm?.id );
        arrRet.push( this.entity?.registeredAs );
        arrRet.push( entRegAuth.get(this.entity?.registeredAt?.id)?.desc || this.entity?.registeredAt?.id );
        arrRet.push( this.entity?.status );
        arrRet.push( sDateIsoToYYYYMMDD(this.meta?.goldenCopy?.publishDate) );

        return arrRet.map(elem => nullUndefToEmptyStr(elem));
    }
});

level1LEI.prototype.toString = function() {
    return this.toLabelValueRec
        .map( elem => String(elem) )
        .filter( elem => elem !== '' )
        .join('\n');
}

level1LEI.prototype.toDelimStr = function() {
    return this.toDelimStrRec
        .reduce((accu, elem) => accu + elem + globals.delimSep, '')
}

const level1LEIs = LEIs.map( elem => new level1LEI(elem) );

//Constructor function to instantiate a Label object
function Label(desc) {
    this.desc = desc;
}

Label.prototype.toString = function() {
    return this.desc;
}

//Constructor function to instantiate a Value object
function Value(value) {
    this.value = value;
}

Value.prototype.toString = function() {
    return String(nullUndefToEmptyStr(this.value));
}

//Constructor function to instantiate a LabelValue object
function LabelValue(label, value) {
    this.label = new Label(label);
    this.value = new Value(value);
}

LabelValue.prototype.toString = function() {
    return String(this.value) ? `${this.label}: ${this.value}` : '';
}

export default
    level1LEIs
//        .map( elem => String(elem) )
//        .join('\n\n');
        .map( elem => elem.toDelimStr().slice(0, -1) )
        .join('\n');
