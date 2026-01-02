/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 6.3: Object property delete
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

//Delete an object property
export default function() {
    var obj = {
        toBeDeleted: 'This property will be deleted',
        remain: 'This property will remain'
    };

    return `
        obj = ${JSON.stringify(obj, null, 3)}

        'toBeDeleted' in obj = ${'toBeDeleted' in obj}
        'remain' in obj = ${'remain' in obj}
        'foo' in obj = ${'foo' in obj}
        'toString' in obj = ${'toString' in obj}

        delete obj.toBeDeleted = ${delete obj.toBeDeleted}
        delete obj.foo = ${delete obj.foo} ⬅️🤔
        delete obj.toString = ${delete obj.toString} ⬅️🤔

        'toBeDeleted' in obj = ${'toBeDeleted' in obj}
        'remain' in obj = ${'remain' in obj}
        'foo' in obj = ${'foo' in obj}
        'toString' in obj = ${'toString' in obj} ⬅️❗

        obj = ${JSON.stringify(obj, null, 3)}
        obj.toString() = ${obj.toString()}

    `;
}
