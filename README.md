# textlint-rule-okurigana

Check Okurigana

## Example

送り仮名を統一する。
例えば、「行なう」は不適で「行う」とする。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-okurigana

## Usage

Set environment variable "TEXTLINT_RULE_OKURIGANA" for dictionary directory.

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "okurigana": true
    }
}
```

Via CLI

```
textlint --rule okurigana README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

GNUGPLv3 © S.Izumiyama
