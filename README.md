# Javascript wrapper for the sentencepiece library

## Build

Sentencepiece is compiled to webassembly using emscripten.

To rebuild this project

```bash

yarn

git clone https://github.com/google/sentencepiece.git

yarn build

```

## Use

To use this tool

```js

const { SentencePieceProcessor, cleanText } = require("../dist");
const ROOT = require('app-root-path')

async function main() {

    let text = "I am still waiting on my card?"
    let cleaned = cleanText(text)

    let spp = new SentencePieceProcessor()
    await spp.load(`${ROOT}/test/30k-clean.model`)
    let ids = spp.encodeIds(cleaned)
    console.log(ids)
    let str = spp.decodeIds(ids) // list ids->number
    console.log(str)

    let pieces = spp.encodePieces(cleaned) // list tokens->string
    console.log(pieces)
}
main()

```

## Note

- devilyouwei updated this repo to make this module support the js `require` keyword and added the using example.

- 2023-1-10, devilyouwei added `encodePieces`.