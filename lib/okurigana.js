"use strict";

var _textlintRuleHelper = require("textlint-rule-helper");

var _types = require("@textlint/types");

var fs = require("fs");

var readline = require("readline");

function initDict(dic_dir) {
  if (typeof dic_dir === "undefined") {
    dic_dir = "./";
  } //console.log(dic_dir + "/dict.dic");


  var dict = [];
  var file = fs.readFileSync(dic_dir + '/okurigana.dic', 'utf-8');

  for (var line of file.split('\n')) {
    if (line.charAt(0) === '#') continue;
    var arr = line.split(' ');
    if (arr[0] === '') continue;
    dict.push(arr);
  }

  return dict;
}

;
var defaultOptions = {
  dictionary_dir: "./dict"
}; //export interface Options {
//    dictionary_dir?: string;
//};

function reporter(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var helper = new _textlintRuleHelper.RuleHelper(context);
  var {
    Syntax,
    getSource,
    RuleError,
    report
  } = context;
  var dictionaryDir = typeof options.dictionary_dir === "undefined" ? defaultOptions.dictionary_dir : options.dictionary_dir;
  var dict = initDict(dictionaryDir); //console.log(dict);

  return {
    [Syntax.Str](node) {
      var text = getSource(node);

      for (var checklist of dict) {
        for (var line of text.split('\n')) {
          var match = line.match(RegExp(checklist[0]));

          if (match) {
            report(node, new RuleError("\u300C" + checklist[0] + "\u300D\u306F\u3060\u3081\u300C" + checklist[1] + "\u300D\u306B\u76F4\u3059: " + line));
          }
        }
      }
    }

  };
}

;
module.exports = {
  linter: reporter
};
//# sourceMappingURL=okurigana.js.map