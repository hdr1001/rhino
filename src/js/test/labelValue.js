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

    if(this.data) ({ attributes: this.attribs, relationships: this.relationships } = this.data);

    if(this.attribs) ({ entity: this.entity } = this.attribs);

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
            new LabelValue( 'LEI', this.attribs?.lei ),
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
level1LEI.prototype.delimAddr = function(addr, addrAttribs, header) {
    //Handle the edge case that no address data is available
    if(!addr && !header) {
        const len = addrAttribs.reduce((accu, attrib) => accu + (attrib.num ? attrib.num : 1), 0);

        return Array.from({ length: len }, () => undefined);
    }

    //Convert the address object attributes to an array
    return addrAttribs.reduce((accu, attrib) => {
            if(attrib.num) {
                for(let i = 0; i < attrib.num; i++) {
                    accu.push(header ? attrib.header + '_' + String(i + 1).padStart(2, '0') : addr[attrib.prop]?.[i])
                }
            }
            else {
                accu.push(header ? attrib.header : addr[attrib.prop])
            }

            return accu;
        },
        []
    );
}

//A template for producing a delimited string
level1LEI.prototype.toDelimStrRec = function(header) {
        let arrRet = [];

        arrRet.push( header ? 'name_01' : this.delimNames(0) );
        arrRet.push( header ? 'name_02' : this.delimNames(1) );
        arrRet = arrRet.concat( this.delimAddr(
            this.entity?.legalAddress,
            [
                { prop: 'addressLines', header: 'addr_line', num: 3},
                { prop: 'postalCode', header: 'addr_post_cd' },
                { prop: 'city', header: 'addr_city' },
                { prop: 'region', header: 'addr_region' },
                { prop: 'country', header: 'addr_ctry' },
            ],
            header
        ) );
        arrRet.push( header ? 'lei' : this.attribs?.lei );
        arrRet.push( header ? 'lgl_form' : entLegalForms.get(this.entity?.legalForm?.id)?.desc || this.entity?.legalForm?.id );
        arrRet.push( header ? 'reg_as' : this.entity?.registeredAs );
        arrRet.push( header ? 'reg_at' : entRegAuth.get(this.entity?.registeredAt?.id)?.desc || this.entity?.registeredAt?.id );
        arrRet.push( header ? 'status' : this.entity?.status );
        arrRet.push( header ? 'publish_dt' : sDateIsoToYYYYMMDD(this.meta?.goldenCopy?.publishDate) );

        return arrRet.map(elem => nullUndefToEmptyStr(elem));
};

level1LEI.prototype.toString = function() {
    return this.toLabelValueRec
        .map( elem => String(elem) )
        .filter( elem => elem !== '' )
        .join('\n');
}

Object.defineProperties(level1LEI.prototype, {
    'toDelimStrHeader': {
        get: function() {
            return this.toDelimStrRec(true).join(globals.delimSep);
        }
    },
    'toDelimStrRecord': {
        get: function() {
            return this.toDelimStrRec().join(globals.delimSep);
        }
    }
});

const level1LEIs = LEIs.map( elem => new level1LEI(elem) );

//Constructor function to instantiate a Label object
function Label(desc) {
    this.desc = desc;
}

Label.prototype.toString = function() {
    return this.desc;
}

Label.prototype.domElem = function(tag = 'td') {
    const elem = document.createElement(tag);
    elem.classList.add('label');
    elem.textContent = this.desc;

    return elem;
}

//Constructor function to instantiate a Value object
function Value(value) {
    this.value = value;
}

Value.prototype.toString = function() {
    return String(nullUndefToEmptyStr(this.value));
}

Value.prototype.isArray = function() {
    return Array.isArray(this.value);
}

Value.prototype.numRows = function() {
    return this.isArray() ? this.value.length : 1;
}

Value.prototype.domElem = function(tag = 'td') {
    let elem = document.createElement(tag);
    elem.classList.add('value');
    elem.textContent = this.value.toString();

    return elem;
}

Value.prototype.domElems = function(tag = 'td') {
    if(!this.isArray()) return [this.domElem(tag)];

    let arrElems = [], elem;

    this.value.forEach( v => {
        elem = document.createElement(tag);
        elem.classList.add('value');
        elem.textContent = String(v);

        arrElems.push(elem);
    });
    
    return arrElems;
}

//Constructor function to instantiate a LabelValue object
function LabelValue(label, value) {
    this.lbl = new Label(label);
    this.val = new Value(value);
}

LabelValue.prototype.toString = function() {
    return String(this.val) ? `${this.lbl}: ${this.val}` : '';
}

LabelValue.prototype.domElem = function() {
    const construct_tr = () => {
        const tr = document.createElement('tr');

        if(this.val.numRows() > 1) {
            tr.appendChild(this.lbl.domElem('td')).setAttribute('rowspan', String(this.val.numRows()))
        }

        let trx = tr;

        this.val.domElems('td').forEach((de, idx) => {
            if(idx === 0) {
                if(this.val.numRows() > 1) {
                    de.setAttribute('rowspan', String(this.val.numRows()))
                }
            }
            else {
                trx = document.createElement('tr');
            }

            tr.appendChild(de) ;
        });

        return tr;
    }

    return this.val
        ? construct_tr()
        : null;
}

function Section(labelValues) {
    this.labelValues = labelValues
}

Section.prototype.domElem = function() {
    if(!this.labelValues.length) return null;

    const table = document.createElement('table');
    this.labelValues.map(lv => table.appendChild(lv.domElem()));

    return table;
}

function sectionIDs(recLEI) {
    return [ 
        new LabelValue('LEI', recLEI.attribs?.lei),
        recLEI.entity?.registeredAs && new LabelValue('Registration number', recLEI.entity.registeredAs)
    ].filter(elem => elem != null)
}

function sectionNames(recLEI) {
    return [ 
        recLEI.entity?.legalName?.name && new LabelValue('Name', recLEI.entity.legalName.name),
        recLEI.entity?.otherNames && recLEI.entity.otherNames.length ? new LabelValue('Other name(s)', recLEI.entity.otherNames.map(elem => elem.name)) : null
    ].filter(elem => elem != null)
}

const idxLEI = 14;

export default
    new Section(sectionIDs(level1LEIs[idxLEI])).domElem().outerHTML + '\n' + 
    new Section(sectionNames(level1LEIs[idxLEI])).domElem().outerHTML;
/*
const showRecs = false;

export default
    showRecs ?
        level1LEIs
            .map( elem => String(elem) )
            .join('\n\n')
        :
            level1LEIs[0].toDelimStrHeader + '\n' +
            level1LEIs.map(elem => elem.toDelimStrRecord).join('\n');
*/