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

const divApp = document.getElementById('app'); //Get reference to app div
const tdAct = 'tdact'; //Table data active class
let pJsOut = null; //Variable to hold reference to js_out paragraph

//The application generates three tables: chapters, paragraphs and functionality
const tables = {
    chapters: { id: 'chapters', actNum: null, name: 'Chapters', tbody: null },
    paragraphs: { id: 'paragraphs', actNum: null, name: 'Paragraphs', tbody: null },
    functionality: { id: 'functionality', actNum: null, name: 'Functionality', tbody: null }
}

//Get the first functionality index for the current chapter & paragraph
function firstFunctionalityIdx() {
    return functionality
        .filter(func => func.chapter === tables.chapters.actNum &&
            func.paragraph === tables.paragraphs.actNum
        )
        .reduce((acc, func) => Math.min(acc, func.num), 0);
}

//Update the pre element in the js_out paragraph with the code results
function updatePre() {
    let textContent = ''; //Default text content

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

    //Replace the content of the pre element
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

//List all chapters in the chapters table,
//assuming the availability of at least one chapter
function listChapters() {
    const tbody = tables.chapters.tbody; if(!tbody) return;

    chapters.forEach((chapter, idx) => {
        let tr, td;

        //console.log(`Adding chapter ${chapter.num}: ${chapter.desc}`);
        tr = document.createElement('tr');
        tbody.appendChild(tr);

        td = document.createElement('td');
        td.textContent = chapter.desc;
        td.addEventListener('click', () => {
            if(tables.chapters.actNum === chapter.num) {
                //console.log('New chapter is the same as the current one, nothing changes');
                return;
            }

            //console.log(`New active chapter is ${chapter.num}`);
            tables.chapters.actNum = chapter.num;

            //Update the chapter UI
            const tdElemActiveList = tbody.querySelectorAll('td.' + tdAct);
            tdElemActiveList.forEach(tdActive => tdActive.classList.remove(tdAct));
            td.classList.add(tdAct);

            //Update the other tables
            listChapterParagraphs();
            listFunctionality();
        });
        tr.appendChild(td);

        if(idx === 0) { //Make the first entry active
            tables.chapters.actNum = chapter.num;
            td.classList.add(tdAct)
        }
    });
}

//List all paragraphs for the active chapter in the paragraphs table
function listChapterParagraphs() {
    const tbody = tables.paragraphs.tbody; if(!tbody) return;

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
            td.addEventListener('click', () => {
                if(tables.paragraphs.actNum === paragraph.num) {
                    //console.log('New paragraph is the same as the current one, nothing changes');
                    return;
                }

                //console.log(`New active paragraph is ${paragraph.num}`);
                tables.paragraphs.actNum = paragraph.num;

                //Update the paragraph UI
                const tdElemActiveList = tbody.querySelectorAll('td.' + tdAct);
                tdElemActiveList.forEach(tdActive => tdActive.classList.remove(tdAct));
                td.classList.add(tdAct);

                listFunctionality();
            });
            tr.appendChild(td);

            if(idx === 0) { //Make the first entry active (if entries available) 
                firstParagraph = paragraph.num;
                td.classList.add(tdAct);
            }
        });

    tables.paragraphs.actNum = firstParagraph;
}

//List all code available for the active chapter & paragraph
function listFunctionality() {
    const tbody = tables.functionality.tbody; if(!tbody) return;

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
            td.addEventListener('click', () => {
                if(tables.functionality.actNum === func.num) {
                    //console.log('New functionality is the same as the current, nothing changes');
                    return;
                }

                //console.log(`New active functionality is ${func.num}`);
                tables.functionality.actNum = func.num;

                //Update the functionality UI
                const tdElemActiveList = tbody.querySelectorAll('td.' + tdAct);
                tdElemActiveList.forEach(tdActive => tdActive.classList.remove(tdAct));
                td.classList.add(tdAct);

                updatePre();
            });
            tr.appendChild(td);

            if(idx === 0) { //Make the first entry active (if entries available)
                firstFunc = func.num;
                td.classList.add(tdAct);
            }
        });

    tables.functionality.actNum = firstFunc;
    updatePre();
}

//Create and add a table to the app div
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

//If the app div exists, add the tables and initialize the js_out paragraph
if(divApp) {
    Object.keys(tables).forEach(key => divApp.appendChild(addTable(tables[key])));

    pJsOut = document.createElement('p');
    pJsOut.appendChild(document.createTextNode('➡️Generated by selected functionality⬇️'));
    pJsOut.setAttribute('id', 'js_out');
    divApp.parentNode.insertBefore(pJsOut, divApp.nextSibling);

    if(tables.chapters.tbody) listChapters();
    if(tables.paragraphs.tbody) listChapterParagraphs();
    if(tables.functionality.tbody) listFunctionality();
}
