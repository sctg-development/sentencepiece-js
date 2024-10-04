import Module from "./sentencepiece"
import * as fs from "fs"

export class SentencePieceProcessor {

    processor: any;
    sentencepiece: any;

    // load model
    async load(url: string) {

        this.sentencepiece = await Module();

        // change to fs read model file
        this.sentencepiece.FS.writeFile("sentencepiece.model", fs.readFileSync(url));
        const string_view = new this.sentencepiece.StringView("sentencepiece.model");
        const absl_string_view = string_view.getView();

        this.processor = new this.sentencepiece.SentencePieceProcessor();
        const load_status = this.processor.Load(absl_string_view);

        load_status.delete();
        absl_string_view.delete();
        string_view.delete();

    }


    encodeIds(text: string) {

        const string_view = new this.sentencepiece.StringView(text);

        const absl_string_view = string_view.getView();

        const data = this.processor.EncodeAsIds(absl_string_view);

        const arr: Array<number> = []
        for (let i = 0; i < data.size(); i++)
            arr.push(data.get(i) as number)

        data.delete();
        absl_string_view.delete();
        string_view.delete();

        return arr;
    }

    encodePieces(text: string) {

        const string_view = new this.sentencepiece.StringView(text);

        const absl_string_view = string_view.getView();

        const data = this.processor.EncodeAsPieces(absl_string_view);

        // let arr = this.sentencepiece.vecToStringArray(ids);
        const arr: Array<string> = []
        for (let i = 0; i < data.size(); i++)
            arr.push(data.get(i) as string)

        data.delete();
        absl_string_view.delete();
        string_view.delete();


        return arr;
    }


    decodeIds(ids: Int32Array) {

        const vecIds = this.sentencepiece.vecFromJSArray(ids);

        const str = this.processor.DecodeIds(vecIds).slice();

        vecIds.delete();

        return str;
    }

    loadVocabulary(url: string) {

        this.sentencepiece.FS.writeFile("sentencepiece.vocab", fs.readFileSync(url));

        const string_view = new this.sentencepiece.StringView("sentencepiece.vocab");

        const absl_string_view = string_view.getView();

        const status = this.processor.LoadVocabulary(absl_string_view, -1000);

        status.delete();
        absl_string_view.delete();
        string_view.delete();
    }
}

export function cleanText(text: string) {
    const stringBuilder: string[] = [];
    let originalCharIndex = 0, newCharIndex = 0;
    for (const ch of text) {
        // Skip the characters that cannot be used.
        if (isInvalid(ch)) {
            originalCharIndex += ch.length;
            continue;
        }
        if (isWhitespace(ch)) {
            if (stringBuilder.length > 0 &&
                stringBuilder[stringBuilder.length - 1] !== ' ') {
                stringBuilder.push(' ');
                originalCharIndex += ch.length;
            } else {
                originalCharIndex += ch.length;
                continue;
            }
        } else {
            stringBuilder.push(ch);
            originalCharIndex += ch.length;
        }
        newCharIndex++;
    }
    return stringBuilder.join('').toLowerCase();
}

function isWhitespace(ch) {
    return /\s/.test(ch);
}

function isInvalid(ch) {
    return (ch.charCodeAt(0) === 0 || ch.charCodeAt(0) === 0xfffd);
}