/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.2: Querying and setting properties
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

//Dot operator
function dotOp() {
    var arrRet = [], obj = null;

    arrRet.push(`obj = ${obj}`);
    arrRet.push(`obj && obj.prop = ${obj && obj.prop}`);

    try {
        arrRet.push(`The following expression will trigger an error ${obj.prop}`)
    }
    catch(err) {
        arrRet.push(err.constructor.name + ': ' + err.message)
    }

    obj = {}; //Instantiate an empty object

    //Dot operator
    obj.propDot = 'Property created by assignment';

    arrRet.push(obj.propDot);

    //Square brackets
    var str = 'prop_sb';

    obj[str] = 'Property created by assignment using square brackets';

    arrRet.push(obj[str]);

    //Change a property value
    obj.propDot = 'Value associated with propDot changed';

    arrRet.push(obj.propDot);

    return arrRet.join('\n');
}

//Inheritance and prototypes
var objProto = {
    prop: 'a property on the prototype',
    level: {
        num: 42,
        str: 'forty-two'
    },
    method: function() {
        return 'Value of prop: ' + this.prop + ' (@level ' + this.level.str + ')';
    }
};

function objCreateProto() {
    var arrRet = [];

    //Create a new object with objProto as prototype
    var obj = Object.create(objProto);

    arrRet.push('All on the prototype');
    arrRet.push(`obj.method()      ➡️ ${obj.method()}`);
    arrRet.push(' ');

    //Property overriding
    obj.prop = 'Property on object instantiated using Object.create';

    arrRet.push('obj.prop dynamically created');
    arrRet.push(`objProto.method() ➡️ ${objProto.method()}`);
    arrRet.push(`obj.method()      ➡️ ${obj.method()}`);
    arrRet.push(' ');

    //Works differently for reference types (i.e. level) though
    obj.level.str = 'tweeënveertig';

    arrRet.push('obj.level.str changed');
    arrRet.push(`objProto.method() ➡️ ${objProto.method()}`);
    arrRet.push(`obj.method()      ➡️ ${obj.method()}`);

    return arrRet.join('\n');
}

function doSetProp() {
    var varSetProp; //Defaults to undefined
    
    //varSetProp = null;
    //varSetProp = {}

    var arrRet = [];

    arrRet.push('typeof varSetProp ➡️ ' + typeof varSetProp);

    //Attempting to set a property on null or undefined causes a TypeError
    try {
        varSetProp.prop = 'Possible ☠️';

        arrRet.push('Property set successfully on varSetProp');
    }
    catch(err) {
        arrRet.push(err.constructor.name + ': ' + err.message);
    }

    return arrRet.join('\n');
}

function doSetPropReadOnly() {
    var ret;

    //Attempting to set a read-only property causes a TypeError
    //as JavaScript modules are automatically in strict mode
    try {
        Math.PI = '☠️';

        ret = 'You won\'t end up here in strict mode';
    }
    catch(err) {
        ret = err.constructor.name + ': ' + err.message;
    }

    return ret;
}

export default {
    dotOp,
    objCreateProto,
    doSetProp,
    doSetPropReadOnly
};
