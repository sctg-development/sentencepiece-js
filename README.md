# Javascript wrapper for the sentencepiece library

## Build

Sentencepiece is compiled to webassembly using emscripten.

To rebuild this project

```bash

yarn

git clone --recurse-submodules  https://github.com/sctg-development/sentencepiece-js.git

yarn build

```

## Use

To use this tool in nodejs, you can use the following code:

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

In the browser, you can use the following code:

```js
import { SentencePieceProcessor, cleanText, llama_3_1_tokeniser_b64 } from "@sctg/sentencepiece-js";
// built in models: llama_3_1_tokeniser_b64, clean_30k_b64, smart_b64
async function main() {

    let text = "I am still waiting on my card?"
    let cleaned = cleanText(text)

    let spp = new SentencePieceProcessor()
    await spp.lloadFromB64StringModel(llama_3_1_tokeniser_b64);
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
- original author: https://github.com/JanKaul/sentencepiece