/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Extra: this in different contexts
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

const retArr = [];

function fThis() { return `In the body of a plain function this evaluates to ${this}`; }

retArr.push('--- Testing keyword this ---');
retArr.push('Remember ➡️ modules will always run in strict mode!');
retArr.push('');
retArr.push('In the global scope:');
retArr.push(`Type of this ➡️ ${typeof this},`);
retArr.push(`globalThis.hasOwnProperty('Math') ➡️ ${globalThis.hasOwnProperty('Math')},`);
retArr.push('');
retArr.push('In a plain function:');
retArr.push('fThis() ➡️ ' + fThis());
retArr.push('');

var obj = {
    name: 'Top level object',

    fThis: function() {
        return `In a method call this evaluates to the object owning the method: ${this.name}`;
    },

    nested: {
        nestedName: 'Nested object',

        fThis: function() {
            return `This version of fThis exists on the nested object: ${this.nestedName}`;
        },

        fThisTopLevelName: function() {
            return `This version of fThis exists on the nested object: ${this.name}`; //won't work
        },
    
        fThisTopLevelNameII: function() {
            return `This version of fThis exists on the nested object: ${obj.name}`; //works
        },
    }
};

retArr.push('In an object method:');
retArr.push('obj.fThis() ➡️ ' + obj.fThis());
retArr.push('');
retArr.push('In an object method:');
retArr.push('obj.nested.fThis() ➡️ ' + obj.nested.fThis());
retArr.push('');
retArr.push('In an object method:');
retArr.push('obj.nested.fThisTopLevelName() ➡️ ' + obj.nested.fThisTopLevelName());
retArr.push('');
retArr.push('In an object method:');
retArr.push('obj.nested.fThisTopLevelNameII() ➡️ ' + obj.nested.fThisTopLevelNameII());
retArr.push('');

function ConstructorFunction() {
    //implicit when called with new
    //this = {};
    //Object.setPrototypeOf(this, ConstructorFunction.prototype);

    this.name = 'Instance created by ConstructorFunction';

    //Also implicit when called with new
    //return this;
}

ConstructorFunction.prototype.fThisOnProto = function() {
    return `In a method defined on the prototype this evaluates to the object owning the method: ${this.name}`;
}

var cfInstance = new ConstructorFunction();

retArr.push('In a method defined on the prototype of a constructor function:');
retArr.push('cfInstance.fThisOnProto() ➡️ ' + cfInstance.fThisOnProto());
retArr.push('');

export default retArr.join('\n');
