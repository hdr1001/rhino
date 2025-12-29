/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.12: Eval, evaluates code represented as a regular string
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

var x = 'foo';

export default function execEval() {
    var x = 'bar';

    return `
        eval(\'Math.E\') ➡️ ${eval('Math.E')}

        x ➡️ ${x}

        eval(\'x += "_d"\') ➡️ ${eval('x += "_d"')}

        x ➡️ ${x}

        eval(\'var x = 42; x\') ➡️ ${eval('var x = 42; x')}

        eval(\'var y = 43; y\') ➡️ ${eval('var y = 43; y')}

        y ➡️ ${typeof y === 'undefined' ? 'is undefined' : y}

    `;
}
