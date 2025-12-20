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

function firstFunctionalityIdx() {
    return functionality
        .filter(func => func.chapter === tables.chapters.actNum &&
            func.paragraph === tables.paragraphs.actNum
        )
        .reduce((acc, func) => Math.max(acc, func.num), 0);
}

function updatePre() {
    let textContent = '';

    console.log('Updating pre with functionality index ' + tables.functionality.actNum);
    //tables.functionality.actNum can have a null value!
    try {
        switch(typeof functionality[tables.functionality.actNum].code) {
            case 'string', 'number', 'boolean', 'undefined':
                textContent = functionality[tables.functionality.actNum].code;
                break;
            case 'function':
                textContent = functionality[tables.functionality.actNum].code()
        }
    }
    catch(err) {
        console.error(err.message)
    }

    if(pJsOut) {
        let pre = pJsOut.getElementsByTagName('pre');

        if(pre.length) {
            pre = pre[0]
        }
        else {
            pre = pJsOut.appendChild(document.createElement('pre'));
        }

        while(pre.hasChildNodes()) { pre.removeChild(pre.lastChild) }

        pre.appendChild(document.createTextNode(textContent));
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
    tables.functionality.actNum = numFunc; //numFunc can be null!

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

    let firstParagraph = null;

    paragraphs
        .filter(paragraph => paragraph.chapter === tables.chapters.actNum)
        .forEach((paragraph, idx) => {
            let tr, td;

            //console.log(`Adding paragraph ${paragraph.num}: ${paragraph.desc}`);
            tr = document.createElement('tr');
            tbody.appendChild(tr);

            td = document.createElement('td');
            td.textContent = paragraph.desc;
            td.addEventListener('click', () => changeActParagraph(paragraph.num));
            tr.appendChild(td);

            if(idx === 0) firstParagraph = paragraph.num;
        });

    tables.paragraphs.actNum = firstParagraph;
}

function listFunctionality(tbody) {
    while(tbody.hasChildNodes()) { tbody.removeChild(tbody.lastChild) }

    let firstFunc = null;

    functionality
        .filter(func => 
            func.chapter === tables.chapters.actNum &&
            func.paragraph === tables.paragraphs.actNum
        )
        .forEach((func, idx) => {
            let tr, td;

            //console.log(`Adding paragraph ${func.num}: ${func.desc}`);
            tr = document.createElement('tr');
            tbody.appendChild(tr);

            td = document.createElement('td');
            td.textContent = func.desc;
            td.addEventListener('click', () => changeActFunctionality(func.num));
            tr.appendChild(td);

            if(idx === 0) firstFunc = func.num;
        });

    changeActFunctionality(firstFunc);
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

    pJsOut = document.createElement('p');
    pJsOut.appendChild(document.createTextNode('➡️Generated by selected functionality⬇️'));
    pJsOut.setAttribute('id', 'js_out');
    divApp.parentNode.insertBefore(pJsOut, divApp.nextSibling);

    if(tables.chapters.tbody) listChapters(tables.chapters.tbody);
    if(tables.paragraphs.tbody) listChapterParagraphs(tables.paragraphs.tbody);
    if(tables.functionality.tbody) listFunctionality(tables.functionality.tbody);
}
