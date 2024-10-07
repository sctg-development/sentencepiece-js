# Javascript wrapper for the sentencepiece library

![Build React App](https://github.com/sctg-development/sentencepiece-js/actions/workflows/build_react.yaml/badge.svg)
![Publish to npmjs registry](https://github.com/sctg-development/sentencepiece-js/actions/workflows/build.yaml/badge.svg)

## Browser Demo

You can see Sentencepiece-js in action for counting and displaying tokens using the [Meta Llama 3.1 tokenizer model](https://huggingface.co/spaces/Xanthius/llama-token-counter/blob/main/tokenizer.model) on GitHub Pages: https://sctg-development.github.io/sentencepiece-js/. All computations are performed in your browser, and no data is sent to the server. To display the tokens, click on the `tokens` link.

This simple React app is located in the `tokenCount` directory of this repository. It is built with React 18, Vite, and the Fluent UI v9 framework.

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
import { Buffer } from "buffer";
import { SentencePieceProcessor, cleanText, llama_3_1_tokeniser_b64 } from "@sctg/sentencepiece-js";

// eslint-disable-next-line no-undef
globalThis.Buffer = Buffer;
// built in models: llama_3_1_tokeniser_b64, clean_30k_b64, smart_b64
async function main() {

    let text = "I am still waiting on my card?"
    let cleaned = cleanText(text)

    let spp = new SentencePieceProcessor()
    await spp.loadFromB64StringModel(llama_3_1_tokeniser_b64);
    let ids = spp.encodeIds(cleaned)
    console.log(ids)
    let str = spp.decodeIds(ids) // list ids->number
    console.log(str)

    let pieces = spp.encodePieces(cleaned) // list tokens->string
    console.log(pieces)
}
main()
```

See https://github.com/sctg-development/ai-outlook/blob/HEAD/src/aipane/aipane.ts#L11-L23 for an example of how to use this in a react app.  
Look also at webpack.config.js for the configuration of the webpack bundler.

- devilyouwei updated this repo to make this module support the js `require` keyword and added the using example.
- 2023-1-10, devilyouwei added `encodePieces`.
- original author: https://github.com/JanKaul/sentencepiece