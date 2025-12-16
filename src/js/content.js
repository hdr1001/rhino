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

let actChapter = 2, actParagraph = 1;

const tbodyChapters = document.getElementById('chapters_tbody');
const tbodyParagraphs = document.getElementById('paragraphs_tbody');

const changeActChapter = numChapter => actChapter = numChapter;
const changeActParagraph = numParagraph => actParagraph = numParagraph;

function listChapters() {
    chapters.forEach(chapter => {
        let tr, td;

        //console.log(`Adding chapter ${chapter.num}: ${chapter.desc}`);
        tr = document.createElement('tr');
        tbodyChapters.appendChild(tr);

        td = document.createElement('td');
        td.textContent = chapter.desc;
        td.addEventListener('click', () => changeActChapter(chapter.num));
        tr.appendChild(td);
    });
}

function listChapterParagraphs() {
    paragraphs.filter(paragraph => paragraph.chapter === actChapter).forEach(paragraph => {
        let tr, td;

        //console.log(`Adding paragraph ${paragraph.num}: ${paragraph.desc}`);
        tr = document.createElement('tr');
        tbodyParagraphs.appendChild(tr);

        td = document.createElement('td');
        td.textContent = paragraph.desc;
        td.addEventListener('click', () => changeActParagraph(paragraph.num));
        tr.appendChild(td);
    });
}

if(tbodyChapters) listChapters();
if(tbodyParagraphs) listChapterParagraphs();
