/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 4.5: Invocation expressions
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

var sayHi = function (name) { return `Hi ${name}` };

//sayHi('Mario') is the funcion invocation expression
export function func() { return sayHi('Mario') };

var luigi = {
    name: 'Luigi',
    sayHi: function () { return `Hi ${this.name}`; }
};

//luigi.sayHi() is the method invocation expression
export function method() { return luigi.sayHi() };
