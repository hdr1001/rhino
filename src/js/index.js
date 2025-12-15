/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Inject content on DOMContentLoaded event
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

console.log('Running script index.js');

document.addEventListener('DOMContentLoaded', () => {
    console.log('Adding the JS output to the document');

    const pElement = document.getElementById('js_out');

    if(pElement) {
        const codeElement = document.createElement('pre');

        codeElement.textContent = esc_seq();

        pElement.appendChild(codeElement);
    }    
});
