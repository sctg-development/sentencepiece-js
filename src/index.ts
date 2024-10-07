import { SentencePieceProcessor, cleanText } from "./sentencePieceProcessor";
import { llama_3_1_tokeniser_b64 } from "./llama_3_1_tokeniser_model";
import { smart_b64 } from "./smart";
import { clean_30k_b64 } from "./clean_30k";
import { Buffer as _Buffer } from "buffer";

export { SentencePieceProcessor, cleanText, llama_3_1_tokeniser_b64, clean_30k_b64, smart_b64 };
export default { SentencePieceProcessor, cleanText };``

if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = _Buffer;
}