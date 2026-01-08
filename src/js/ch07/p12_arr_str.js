/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.10: Strings as array-like objects
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

//String manipulation using object wrappers and array methods
export default function strAsArray() {
    var str = 'JavaScript: The Definitive Guide (version 6)', strShort;

    return `
        str ➡️ ${str}
        strShort ➡️ ${strShort = str.slice(16, 26)}
        str.length ➡️ ${str.length}
        str.charAt(4) ➡️ ${str.charAt(4)}
        str[4] ➡️ ${str[4]}
        str.indexOf('version') ➡️ ${str.indexOf('version')}
        Array.from(strShort).join('+') ➡️ ${Array.from(strShort).join('+')}
        Array.prototype.join.call(strShort, '*') ➡️ ${Array.prototype.join.call(strShort, '*')}
        Array.prototype.filter.call(str, char => char.match(/[^aeiou]/)).join('') ➡️ ${Array.prototype.filter.call(str, char => char.match(/[^aeiou]/)).join('')}
    
    `;
}
