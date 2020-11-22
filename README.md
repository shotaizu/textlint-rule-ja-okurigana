# textlint-rule-okurigana

Check Okurigana

## Example

私がよく間違える送り仮名を統一する。
例えば、「行なう」は不適で「行う」とする。
詳細は「内閣告示・訓令」に従うようにする (現時点では、対応しきれていない。辞書に追加することで可能となる)。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install shotaizu/textlint-rule-okurigana

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "okurigana": true
    }
}
```

There is one option: you need to point out their location.

```json
{
    "rules": {
        "okurigana": {
            "dictionary_dir": <path-to-directory-including-okurigana.dic>
            }
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

But this may fail for now...

## License

GNUGPLv3 © S.Izumiyama
