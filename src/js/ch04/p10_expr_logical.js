/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.10: Logical expressions
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

var obj = { foo: { bar: '😎' }, zero: 0, one: 1, z: null};

var iniValue = null; //If falsy aVar will be assigned a default value

var aVar = iniValue || 'a default';

export default function shortCircuiting() {
   return `
      true && false ➡️ ${true && false}
      true || false ➡️ ${true || false}

      obj && obj.foo && obj.foo.bar ➡️ ${obj && obj.foo && obj.foo.bar}
      obj && obj.zero && obj.zero.prop ➡️ ${obj && obj.zero && obj.zero.prop}
      obj && obj.one ➡️ ${obj && obj.one }
      obj && obj.one && obj.one.prop ➡️ ${obj && obj.one && obj.one.prop}
      obj && obj.z && obj.z.prop ➡️ ${obj && obj.z && obj.z.prop}
      obj && obj.x && obj.x.y ➡️ ${obj && obj.x && obj.x.y}

      aVar ➡️ ${aVar}

   `;
}
