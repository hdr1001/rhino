/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Scripts for listing the available content
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
];

const divFunctionality = document.getElementById('functionality');
let pJsOut = null;

const tables = {
    chapters: { id: 'chapters', actNum: 2, name: 'Chapters', tbody: null },
    paragraphs: { id: 'paragraphs', actNum: 1, name: 'Paragraphs', tbody: null },
    functionality: { id: 'functionality', actNum: 0, name: 'Functionality', tbody: null }
}

function changeActChapter(numChapter) { 
    tables.chapters.actNum = numChapter;
    
    listChapterParagraphs(tables.paragraphs.tbody);
    listFunctionality(tables.functionality.tbody);
}

const changeActParagraph = numParagraph => tables.paragraphs.actNum = numParagraph;
const changeActFunctionality = numFunc => { tables.functionality.actNum = numFunc; console.log(`Selected functionality number ${numFunc}`); };

function listChapters(tbody) {
    chapters.forEach(chapter => {
        let tr, td;

        //console.log(`Adding chapter ${chapter.num}: ${chapter.desc}`);
        tr = document.createElement('tr');
        tbody.appendChild(tr);

        td = document.createElement('td');
        td.textContent = chapter.desc;
        td.addEventListener('click', () => changeActChapter(chapter.num));
        tr.appendChild(td);
    });
}

function listChapterParagraphs(tbody) {
    while(tbody.hasChildNodes()) { tbody.removeChild(tbody.lastChild) }

    paragraphs.filter(paragraph => paragraph.chapter === tables.chapters.actNum).forEach(paragraph => {
        let tr, td;

        //console.log(`Adding paragraph ${paragraph.num}: ${paragraph.desc}`);
        tr = document.createElement('tr');
        tbody.appendChild(tr);

        td = document.createElement('td');
        td.textContent = paragraph.desc;
        td.addEventListener('click', () => changeActParagraph(paragraph.num));
        tr.appendChild(td);
    });
}

function listFunctionality(tbody) {
    while(tbody.hasChildNodes()) { tbody.removeChild(tbody.lastChild) }

    functionality
        .filter(func => 
            func.chapter === tables.chapters.actNum &&
            func.paragraph === tables.paragraphs.actNum
        )
        .forEach(func => {
            let tr, td;

            //console.log(`Adding paragraph ${paragraph.num}: ${paragraph.desc}`);
            tr = document.createElement('tr');
            tbody.appendChild(tr);

            td = document.createElement('td');
            td.textContent = func.desc;
            td.addEventListener('click', () => changeActFunctionality(func.num));
            tr.appendChild(td);
        });
}

function addTable(tableInstance) {
    const div = document.createElement('div');
    div.setAttribute('id', tableInstance.id + '_div');

    const table = document.createElement('table');
    const thead = table.appendChild(document.createElement('thead'));
    const tr = thead.appendChild(document.createElement('tr'));
    const th = tr.appendChild(document.createElement('th'));
    th.appendChild(document.createTextNode(tableInstance.name));

    tableInstance.tbody = table.appendChild(document.createElement('tbody'));
    tableInstance.tbody.setAttribute('id', tableInstance.id + '_tbody');

    div.appendChild(table);

    return div;
}

if(divFunctionality) {
    Object.keys(tables).forEach(key => divFunctionality.appendChild(addTable(tables[key])));

    if(tables.chapters.tbody) listChapters(tables.chapters.tbody);
    if(tables.paragraphs.tbody) listChapterParagraphs(tables.paragraphs.tbody);
    if(tables.functionality.tbody) listFunctionality(tables.functionality.tbody);

    pJsOut = document.createElement('p');
    pJsOut.setAttribute('id', 'js_out');
    divFunctionality.parentNode.insertBefore(pJsOut, divFunctionality.nextSibling);
}
