const { SentencePieceProcessor, cleanText, llama_3_1_tokeniser_b64 } = require("../dist");
const ROOT = require('app-root-path')

async function main() {

    let text = "I am still waiting on my card?";
    let cleaned = cleanText(text);

    let spp = new SentencePieceProcessor();
    await spp.load(`${ROOT}/test/llama-3.1-tokenizer.model`)
    let ids = spp.encodeIds(cleaned);
    console.log(ids)
    console.log(`Token length: ${ids.length}`)
    let str = spp.decodeIds(ids)
    console.log(str)

    let pieces = spp.encodePieces(cleaned);
    console.log(pieces)

    let spp2 = new SentencePieceProcessor();
    await spp2.loadFromB64StringModel(llama_3_1_tokeniser_b64);
    let ids2 = spp2.encodeIds(cleaned);
    console.log(ids2)
    console.log(`Token length: ${ids2.length}`)
    let str2 = spp2.decodeIds(ids2)
    console.log(str2)

    let pieces2 = spp2.encodePieces(cleaned);
    console.log(pieces2);
}
main()