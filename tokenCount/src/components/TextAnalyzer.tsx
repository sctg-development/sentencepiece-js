import React, { useState, useId, useRef } from "react";
import { Textarea, Button, makeStyles, CardPreview } from "@fluentui/react-components";
import { Buffer } from "buffer";
import {
  SentencePieceProcessor,
  cleanText,
  llama_3_1_tokeniser_b64,
} from "@sctg/sentencepiece-js";

// eslint-disable-next-line no-undef
globalThis.Buffer = Buffer;

const useStyles = makeStyles({
  root: {
  },
  textarea: {
    minHeight: "300px",
    margin: "10px",
  },
  button: {
    margin: "auto",
    width: "30%",
  },
});

function TextAnalyzer() {
  const styles = useStyles();
  const textAnalyserId = useId();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [tokenCount, setWordCount] = useState(0);

  const handleDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      if (event.dataTransfer.items[0].kind === "file") {
        const file = event.dataTransfer.items[0].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            setText(result);
            if (textAreaRef.current) {
              textAreaRef.current.value = result;
            }
          };
          reader.readAsText(file);
        }
      }
    }
  };

  const calculateTokenCount = () => {
    const processor = new SentencePieceProcessor();
    processor.loadFromB64StringModel(llama_3_1_tokeniser_b64).then(() => {
      const cleanedText = cleanText(text);
      const tokens = processor.encodeIds(cleanedText);
      const count = tokens.length;
      setWordCount(count);
    });
  };

  return (
    <CardPreview className={styles.root}>
      <Textarea
        className={styles.textarea}
        appearance="outline"
        id={textAnalyserId}
        ref={textAreaRef}
        placeholder="Enter text or drop a text file"
        onDrop={handleDrop}
        onChange={(event) => setText(event.target.value)}
      />
      <Button appearance="primary" onClick={calculateTokenCount} className={styles.button}>
        Token count
      </Button>
      {tokenCount > 0 && <div>{tokenCount} tokens</div>}
    </CardPreview>
  );
}

export default TextAnalyzer;
