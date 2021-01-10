//=========================================
// textlint-rule-ja-okurigana
//  Copyright 2020 Shota Izumiyama
//
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//============================================

"use strict";
import { RuleHelper } from "textlint-rule-helper";
import { TextlintRuleModule } from "@textlint/types";

const fs = require("fs");
const readline = require("readline");



function initDict(dic_dir){
    if (typeof dic_dir === "undefined"){
        dic_dir = "./";
    }
    //console.log(dic_dir + "/dict.dic");
    var dict = [];
    try {
        const file = fs.readFileSync(dic_dir + '/okurigana.dic', 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        console.log("File not found:" + dic_dir + "/okurigana.dic");
        return dict;
    }
    for (var line of file.split('\n')){
        if( line.charAt(0) === '#') continue;
        const arr = line.split(' ');
        if(arr[0] === '') continue;
        dict.push(arr);
    }

    return dict;
};

const defaultOptions = {
    dictionary_dir: "./dict"
};

//export interface Options {
//    dictionary_dir?: string;
//};


function reporter (context, options = {}){
    const helper = new RuleHelper(context);
    const { Syntax, getSource, RuleError, report } = context;
    const dictionaryDir = typeof options.dictionary_dir === "undefined" ? defaultOptions.dictionary_dir : options.dictionary_dir;
    const dict = initDict(dictionaryDir);
    //console.log(dict);
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            for( var checklist of dict){
                for( var line of text.split('\n')){
                    const match = line.match(RegExp(checklist[0]));
                    if (match){
                        report(
                            node,
                            new RuleError(`「` + checklist[0] + `」はだめ「` + checklist[1] + `」に直す: ` + line)
                        );
                    }
                }
            }
        }
    };
};

module.exports = {
    linter: reporter
}
