/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Scripts for presenting the available content
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

import { chapters, paragraphs, functionality } from './content.js';

console.log('Running content logic script');

const divApp = document.getElementById('app');
let pJsOut = null;

const tables = {
    chapters: { id: 'chapters', actNum: 2, name: 'Chapters', tbody: null },
    paragraphs: { id: 'paragraphs', actNum: 1, name: 'Paragraphs', tbody: null },
    functionality: { id: 'functionality', actNum: 0, name: 'Functionality', tbody: null }
}

function updatePre() {
    if(pJsOut) {
        while(pJsOut.hasChildNodes()) { pJsOut.removeChild(pJsOut.lastChild) }

        const pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(functionality[tables.functionality.actNum].code()));
        pJsOut.appendChild(pre);
    }
}

function changeActChapter(numChapter) { 
    tables.chapters.actNum = numChapter;
    
    listChapterParagraphs(tables.paragraphs.tbody);
    listFunctionality(tables.functionality.tbody);
}

function changeActParagraph(numParagraph) {
    tables.paragraphs.actNum = numParagraph;

    listFunctionality(tables.functionality.tbody);
}

function changeActFunctionality(numFunc) {
    tables.functionality.actNum = numFunc;

    updatePre();
}

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

            //console.log(`Adding paragraph ${func.num}: ${func.desc}`);
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

if(divApp) {
    Object.keys(tables).forEach(key => divApp.appendChild(addTable(tables[key])));

    if(tables.chapters.tbody) listChapters(tables.chapters.tbody);
    if(tables.paragraphs.tbody) listChapterParagraphs(tables.paragraphs.tbody);
    if(tables.functionality.tbody) listFunctionality(tables.functionality.tbody);

    pJsOut = document.createElement('p');
    pJsOut.appendChild(document.createTextNode('⬇️'));
    pJsOut.setAttribute('id', 'js_out');
    divApp.parentNode.insertBefore(pJsOut, divApp.nextSibling);

    updatePre();
}
