/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Structures for listing the available content
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

import esc_seq from './ch02/p01_esc_seq.js';
import validID from './ch02/p04_identifiers.js';
import semicolons from './ch02/p05_semicolons.js';
import typeVars from './ch03/p00_types_vars.js';

const chapters = [
    { num: 2, desc: 'Lexical structure' },
    { num: 3, desc: 'Types, values and variables' }
];

const paragraphs = [
    { chapter: 2, num: 1, desc: 'Escape sequences' },
    { chapter: 2, num: 4, desc: 'Identifiers and reserved words' },
    { chapter: 2, num: 5, desc: 'Optional semicolons' },

    { chapter: 3, num: 0, desc: 'Introduction' },
    { chapter: 3, num: 1, desc: 'Numbers' },
    { chapter: 3, num: 2, desc: 'Text' },
    { chapter: 3, num: 3, desc: 'Boolean values' },
    { chapter: 3, num: 4, desc: 'null and undefined' },
    { chapter: 3, num: 5, desc: 'The global object' },
    { chapter: 3, num: 6, desc: 'Wrapper objects' },
    { chapter: 3, num: 7, desc: 'Immutable v. mutable' },
    { chapter: 3, num: 8, desc: 'Type conversions' },
    { chapter: 3, num: 9, desc: 'Variable declaration' },
    { chapter: 3, num: 10, desc: 'Variable scope' }
];

const functionality = [
    { chapter: 2, paragraph: 1, num: 0, desc: 'Escape sequence', code: esc_seq },
    { chapter: 2, paragraph: 4, num: 1, desc: 'Valid identifiers', code: validID },
    { chapter: 2, paragraph: 5, num: 2, desc: 'Semicolons', code: semicolons },

    { chapter: 3, paragraph: 0, num: 3, desc: 'Global v. module level vars', code: typeVars.globalModuleLevelVars },
    { chapter: 3, paragraph: 0, num: 4, desc: 'JavaScript variable types', code: typeVars.jsTypes },
    { chapter: 3, paragraph: 0, num: 5, desc: 'JavaScript variables', code: typeVars.jsVariables }
];

export { chapters, paragraphs, functionality };
