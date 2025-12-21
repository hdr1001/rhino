/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 3.2: Strings
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

//Strings are immutable
function strImmutable() {
    var str = 'A JavaScript string is immutable';

    console.log(str[2]); //will work

    try {
        str[2] = 'j' //throws an error
    }
    catch(err) {
        console.error(err.message)
    }

    return `The value of str is "${str}".`;
}

//String wrapper methods
function strWrapperMethods() {
    var str = 'Even though a JavaScript string is a primitive it is possible to invoke methods';

    return `
        str ➡️ ${str}
        str.slice(14, 24) ➡️ ${str.slice(14, 24)}
        str.indexOf('m') ➡️ ${str.indexOf('m')}
        str.lastIndexOf('m') ➡️ ${str.lastIndexOf('m')}
        str.split(' ')[3] ➡️ ${str.split(' ')[3]}
        str.toUpperCase().substring(0, 11) ➡️ ${str.toUpperCase().substring(0, 11)}
        str.toLowerCase().substring(14, 24) ➡️ ${str.toLowerCase().substring(14, 24)}

    `;
}

export default {
    strImmutable,
    strWrapperMethods
};
