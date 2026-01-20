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
    return this.value;
}

//Constructor function to instantiate a LabelValue object
function LabelValue(label, value) {
    this.label = new Label(label);
    this.value = new Value(value);
}

LabelValue.prototype.toString = function() {
    return `${this.label}: ${this.value}`;
}

export default 
    LEIs.map( elem => new LabelValue('LEI', elem.data.attributes.lei ) ).join('\n') + '\n\n' +
    LEIs.map( elem => new LabelValue('Name', elem.data.attributes.entity.legalName.name ) ).join('\n') + '\n\n' +
    LEIs.map( elem => new LabelValue('Name', elem.data.attributes.entity.legalName.name ).value ).join('\n');
