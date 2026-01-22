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
import { nullUndefToEmptyStr } from '../utils.js';

//Constructor function for level 1 LEI data
function level1LEI(objLEI) {
    //Data shortcuts
    this.meta = objLEI.meta;
    this.data = objLEI.data;

    this.attributes = this.data && this.data.attributes;

    this.entity = this.attributes && this.attributes.entity;

    this.relationships = this.data && this.data.relationships;

    //Object functionality
    if(this.entity?.otherNames) {
        const otherNames = this.entity.otherNames
        otherNames.toString = () => otherNames.map(elem => elem.name).join(', ')
    }

    //Data points
    this.attribs = [
        new LabelValue( 'LEI', this.attributes?.lei ),
        new LabelValue( 'Name', this.entity?.legalName?.name ),
        new LabelValue( 'Registration number', this.entity?.registeredAs ),
        new LabelValue( 'Subcategory', this.entity?.subCategory ),
        new LabelValue( 'Other names', this.entity?.otherNames ),
    ];
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
