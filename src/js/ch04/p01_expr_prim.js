/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.1: Primary expressions
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

//Template literals are really convenient to evaluate expressions
//and embed them in strings. Template literals were introduced in
//ES6 and, as such, are not mentioned in the Rhino book.

var varInt = 42,
    varDbl = 2.7,
    varStr = 'String value';

export const expressions = `
    Literals
    - Numeric literals: ${3.14}
    - String literals: ${'Foo Bar'}
    - Boolean literals: ${true}

    Reserved words
    - true: ${true}
    - false: ${false}
    - null: ${null}
    - this: ${this}

    Variable references
    - int: ${varInt}
    - dbl: ${varDbl}
    - str: ${varStr}

`;
