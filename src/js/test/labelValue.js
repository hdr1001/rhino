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
import globals from '../globals.js'
import { nullUndefToEmptyStr } from '../utils.js';

function leiAddrToStr() {
    const arrLegalAddr = [];

    if(Array.isArray(this.addressLines) && this.addressLines.length) {
        arrLegalAddr.push(this.addressLines.join(globals.joinSep))
    }

    if(this.postalCode) arrLegalAddr.push(this.postalCode);

    if(this.city) arrLegalAddr.push(this.city);

    if(this.region) arrLegalAddr.push(this.region);

    if(this.country) arrLegalAddr.push(this.country);

    return arrLegalAddr.join(globals.joinSep);
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

    //Data points
    this.attribs = [
        new LabelValue( 'LEI', this.attributes?.lei ),
        new LabelValue( 'Name', this.entity?.legalName?.name ),
        new LabelValue( 'Legal address', this.entity?.legalAddress),
        this.entity?.legalAddress && this.entity.legalAddress.leiAddrSameAs(this.entity?.headquartersAddress)
            ? null
            : new LabelValue( 'HQ address', this.entity?.headquartersAddress),
        new LabelValue( 'Registration number', this.entity?.registeredAs ),
        new LabelValue( 'Subcategory', this.entity?.subCategory ),
        new LabelValue( 'Other names', this.entity?.otherNames ),
    ].filter(elem => elem !== null);
}

level1LEI.prototype.toString = function() {
    return this.attribs
        .map( elem => String(elem) )
        .filter( elem => elem !== '' )
        .join('\n');
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
        .map( elem => String(elem) )
        .join('\n\n');
