/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Accessing the global object has changed in ES6: http://bit.ly/4nolnsU
// Chapter 3.5: Global object
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

//In a JavaScript module, top-level this is undefined.
var modLevelThis = this;

var objInstance = {
    name: 'I\'m an object instance',
    echoName: function(){ return this.name }
};

//The this reference in modules
export default function modThis() {
    var gblThisWindow = '';

    if(globalThis.window) { 
        gblThisWindow = 'globalThis.window === window is ' + (globalThis.window === window)
    }

    return `
        The this ref at the module level is ${modLevelThis}
        globalThis is ${globalThis}
        globalThis.isNaN === isNaN is ${globalThis.isNaN === isNaN}
        globalThis.Math === Math is ${globalThis.Math === Math}
        ${gblThisWindow ? gblThisWindow : 'No window object available'}
        this.name evaluates to "${objInstance.echoName()}"

    `;
}
