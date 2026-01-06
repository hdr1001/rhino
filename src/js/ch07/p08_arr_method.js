/* ********************************************************************
//
// Notes reading JavaScript: The Definitive Guide, 6th Edition
// Chapter 7.8: The old school array methods
//
// Copyright 2026 Hans de Rooij
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

import Die from '../die.js';

//Split & join & reverse
function arrSplitJoinReverse() {
    var strRet;

    var arrSplit = 'This string will be split using spaces as breakpoints'.split(' ');

    strRet = arrSplit.join('\n');

    arrSplit.reverse(); //in place reverse ➡️ the array itself is reordered

    strRet += '\n\n' + arrSplit.join('\n');

    return strRet;
}

//Split & join & toReversed (toReversed is not old school BTW)
function arrSplitJoinToReversed() {
    var arrSplit = 'This string will be split using spaces as breakpoints'.split(' ');

    var arrSplitRev = arrSplit.toReversed(); //toReversed returns an entirely new array

    //Log an error in case arrSplit deviates from the expectation
    console.assert(arrSplit[0] === 'This',
        { msg: '🤔, the order of arrSplit has changed', arrSplit }
    );

    return arrSplit.join('\n') + '\n\n' + arrSplitRev.join('\n');
}

//Array sort
function arrSort() {
    function sortCaseInsensitive(elem1, elem2) {
        var e1 = elem1.toLowerCase(), e2 = elem2.toLowerCase();

        return e1 < e2 ? -1 : (e2 > e1 ? 1 : 0)
    }

    var arrRet = [], arrStr = ['one', 'two', 'Three', 'four' ];

    arrStr.sort(); //In place, simple case-sensitive alphabetic sort

    arrRet.push(arrStr.join(', '));

    //In place, case-insensitive alphabetic sort
    arrStr.sort(sortCaseInsensitive);

    arrRet.push(arrStr.join(', '));

    //In place, simple alphabetic sort of numbers
    var arrNums = [ 1, 8, 15, 22 ];

    arrNums.sort();

    arrRet.push(arrNums.join(', '))

    //In place, simple sort of numbers without conversion to string
    arrNums.sort((e1, e2) => {
        if(typeof e1 !== 'number' || typeof e2 !== 'number') {
            throw new TypeError('Both arguments must be numbers')
        }

        return e1 - e2;
    })

    arrRet.push(arrNums.join(', '));

    //Not in place
    var arr_bca = [ 'b', 'c', 'a' ];

    var arr_abc = arr_bca.toSorted();

    arrRet.push(arr_bca.join(', '));
    arrRet.push(arr_abc.join(', '));

    return arrRet.join('\n');
}

//Array concat
function arrConcat() {
    var arrRet = [];

    var arr = [ 'a', 'b', 'c' ];

    arrRet.push( arr );

    //Array concatenation (a new array is returned)
    arrRet.push( arr.concat([ 'd', 'e' ]) );
    arrRet.push( arr.concat( 4, 5 ) );
    arrRet.push( arr.concat( ['IV'], [ 'V', 'VI' ] ) );

    return arrRet.join('\n');
}

//Array slice
function arrSlice() {
    var arrRet = [];

    var arr = [ '@', 'a', 'b', 'c', 'd', 'e' ];

    arrRet.push( arr );

    //Take a slice out of an array (a new array is returned)
    //Slice specification is done based on start & last index (not incl)
    arrRet.push( arr.slice( 1, 4) );
    arrRet.push( arr.slice( 4 ) );
    arrRet.push( arr.slice( 0, -2 ) );
    arrRet.push( arr.slice( -3 ) );

    return arrRet.join('\n');
}

//Array splice
function arrSplice() {
    var arrRet = [];

    var arr = [ '😋', '🍔', '🍟', '🥤', '🍦' ];
    var arrSave = Array.from(arr); //Definitely not old school

    //In place removal/addition of array elements (array with deleted elements returned)
    //Splice specification is done based on start index & number of elements
    arrRet.push( arr.join(', ') );
    arrRet.push( '' );

    //Lets do take-out but leave out the fries & drink
    arrRet.push( `arr.splice return: ${arr.splice( 2, 2 ).join(', ')}` );
    arrRet.push( arr.join(', ') ); //Remember splice works in place!
    arrRet.push( '' );

    arr = Array.from(arrSave);

    //Lets do take-out but add broccoli
    arrRet.push( `arr.splice return: ${arr.splice( 2, 0, '🥦' ).join(', ')}` );
    arrRet.push( arr.join(', ') );
    arrRet.push( '' );

    //Replace the fries & drink with potatoes & beer
    //When adding an array it must be flattened explicitely
    arrRet.push( `arr.splice return: ${arr.splice( 3, 2, ...[ '🥔', '🍺' ] ).join(', ')}` );
    arrRet.push( arr.join(', ') );

    return arrRet.join('\n');
}

//Array push & pop
function arrPushPop() {
    var newLength, arrRet = [];

    for(var i = 0; i < 15; i++) {
        console.log(`Push ${i} onto the stack`);

        newLength = arrRet.push(i); //in place change

        console.assert(arrRet.length === newLength,
                { msg: '🤔, arrRet.length === newLength evaluates to false', arrRet }
        )

        if(i % 3 === 0) { //Pop i off the stack if divisible by 3
            console.log(`${arrRet.pop()} is divisible by 3, pop it off the stack`);
        }
    }

    return arrRet.join('\n');
}

//Array unshift & shift
function arrShiftUnshift() {
    var newLength, arrRet = [ -1, -2, -3 ];

    for(var i = 0; i < 15; i++) {
        console.log(`Use unshift to add ${i} at index 0 of the array`);

        newLength = arrRet.unshift(i); //in place change

        console.assert(arrRet.length === newLength,
                { msg: '🤔, arrRet.length === newLength evaluates to false', arrRet }
        )

        if(i % 3 === 0) { //Shift i if i is divisible by 3
            console.log(`${arrRet.shift()} is divisible by 3, shift it`);
        }

        //console.log(`Value -2 now at index: ${arrRet.indexOf(-2)}`);
    }

    return arrRet.join('\n');
}

//Array toString
function arrToString() {
    var arrRet = [], die = new Die;

    var arr = [ 'foo', 3.14, die ]

    arrRet.push('arr.toString() ➡️ ' + arr.toString() );
    arrRet.push('arr ➡️ ' + arr );
    arrRet.push('arr.join() ➡️ ' + arr.join() );
    arrRet.push('arr.join(\' ❄️ \') ➡️ ' + arr.join(' ❄️ ') );

    return arrRet.join('\n')
}

export default {
    arrSplitJoinReverse,
    arrSplitJoinToReversed,
    arrSort,
    arrConcat,
    arrSlice,
    arrSplice,
    arrPushPop,
    arrShiftUnshift,
    arrToString 
};

//Polyfills
if (!Array.prototype.toReversed) {
    Array.prototype.toReversed = function() {
        return Array.from(this).reverse();
    }
}
else {
    //console.log('Array.prototype.toReversed supported natively');
}

if (!Array.prototype.toSorted) {
    Array.prototype.toSorted = function(...args) {
        return Array.from(this).sort(...args);
    }
}
else {
    //console.log('Array.prototype.toSorted supported natively');
}
