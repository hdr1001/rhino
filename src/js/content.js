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
import typeNum from './ch03/p01_nums.js';
import typeStr from './ch03/p02_str.js';
import * as boole from './ch03/p03_boole.js';
import typeUndefNull from './ch03/p04_undef_null.js';
import modThis from './ch03/p05_gbl_obj.js';
import primitiveWrappers from './ch03/p06_wrap_obj.js';
import byValue_v_byRef from './ch03/p07_by_ref_val.js';
import conv from './ch03/p08_type_conv.js';
import modLevelVars from './ch03/p09_var_decl.js';
import scope from './ch03/p10_var_scope.js';
import * as primary from './ch04/p01_expr_prim.js';
import literals from './ch04/p02_expr_obj.js';

const chapters = [
    { num: 2, desc: 'Lexical structure' },
    { num: 3, desc: 'Types, values and variables' },
    { num: 4, desc: 'Expressions and operators' }
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
    { chapter: 3, num: 10, desc: 'Variable scope' },

    { chapter: 4, num: 1, desc: 'Primary expressions' },
    { chapter: 4, num: 2, desc: 'Object & Array Initializers' }
];

const functionality = [
    { chapter: 2, paragraph: 1, num: 0, desc: 'Escape sequence', code: esc_seq },
    { chapter: 2, paragraph: 4, num: 1, desc: 'Valid identifiers', code: validID },
    { chapter: 2, paragraph: 5, num: 2, desc: 'Semicolons', code: semicolons },

    { chapter: 3, paragraph: 0, num: 3, desc: 'Global v. module level vars', code: typeVars.globalModuleLevelVars },
    { chapter: 3, paragraph: 0, num: 4, desc: 'JavaScript variable types', code: typeVars.jsTypes },
    { chapter: 3, paragraph: 0, num: 5, desc: 'JavaScript variables', code: typeVars.jsVariables },

    { chapter: 3, paragraph: 1, num: 6, desc: 'JavaScript numbers', code: typeNum.jsNum },
    { chapter: 3, paragraph: 1, num: 7, desc: 'JavaScript number errors', code: typeNum.noErrs },
    { chapter: 3, paragraph: 1, num: 8, desc: 'Decimal fractions', code: typeNum.f003 },
    { chapter: 3, paragraph: 1, num: 9, desc: 'Date basics (#ms)', code: typeNum.dateBasics },

    { chapter: 3, paragraph: 2, num: 10, desc: 'Immutable strings', code: typeStr.strImmutable },
    { chapter: 3, paragraph: 2, num: 11, desc: 'Primitive wrappers', code: typeStr.strWrapperMethods },

    { chapter: 3, paragraph: 3, num: 12, desc: 'Booleans', code: boole.logic },

    { chapter: 3, paragraph: 4, num: 13, desc: 'undefined', code: typeUndefNull.undef },
    { chapter: 3, paragraph: 4, num: 14, desc: 'undefined == null', code: typeUndefNull.undefNull },

    { chapter: 3, paragraph: 5, num: 15, desc: 'Global this', code: modThis },

    { chapter: 3, paragraph: 6, num: 16, desc: 'Wrapper objects', code: primitiveWrappers },

    { chapter: 3, paragraph: 7, num: 17, desc: 'By ref v. by val', code: byValue_v_byRef },

    { chapter: 3, paragraph: 8, num: 18, desc: 'Type conversions', code: conv.typeConv },
    { chapter: 3, paragraph: 8, num: 19, desc: 'Equality', code: conv.equality },
    { chapter: 3, paragraph: 8, num: 20, desc: 'Strict equality', code: conv.strictEquality },
    { chapter: 3, paragraph: 8, num: 21, desc: 'Number to string', code: conv.numToStr },
    { chapter: 3, paragraph: 8, num: 22, desc: 'String to number', code: conv.strToNum },
    { chapter: 3, paragraph: 8, num: 23, desc: 'Array to string', code: conv.arrToStr },
    { chapter: 3, paragraph: 8, num: 24, desc: 'Get date', code: conv.getDate },
    { chapter: 3, paragraph: 8, num: 25, desc: 'Throw die', code: conv.throwDie },

    { chapter: 3, paragraph: 9, num: 26, desc: 'Module level variables', code: modLevelVars },
    { chapter: 3, paragraph: 9, num: 27, desc: 'Global object property', code: globalThis.typoo },

    { chapter: 3, paragraph: 10, num: 28, desc: 'Exported variable', code: scope.modGlobal },
    { chapter: 3, paragraph: 10, num: 29, desc: 'JS function scope', code: scope.varScope },
    { chapter: 3, paragraph: 10, num: 30, desc: 'Local var precendence', code: scope.localPrecedence },
    { chapter: 3, paragraph: 10, num: 31, desc: 'Different lexical scope', code: scope.diffLexicalScope },
    { chapter: 3, paragraph: 10, num: 32, desc: 'Variable hoisting', code: scope.hoisting },

    { chapter: 4, paragraph: 1, num: 33, desc: 'Primary expressions', code: primary.expressions },

    { chapter: 4, paragraph: 2, num: 34, desc: 'Object literals', code: literals }
];

export { chapters, paragraphs, functionality };
