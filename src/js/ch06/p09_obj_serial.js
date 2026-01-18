/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.9: Object serializing
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

import { Die } from '../die.js';

//Everything you always wanted to know about
//toString & valueOf ➡️ ./die.js

//toJSON method
Die.prototype.toJSON = function() {
    return {
        dots: this.numDots,
        lang: this.lang,
        moreValues: {
            result: this.toString(),
            uniCodeChar: String.fromCodePoint(9855 + this.numDots)
        }
   };
}

var die = new Die();

export default function objJSON() {
    return JSON.stringify(die);
}
