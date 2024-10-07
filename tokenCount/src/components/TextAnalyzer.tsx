import React, { useState, useId, useRef } from "react";
import {
  Textarea,
  Button,
  makeStyles,
  CardPreview,
  Field,
  Text,
} from "@fluentui/react-components";
import {
  SentencePieceProcessor,
  cleanText,
  llama_3_1_tokeniser_b64,
} from "@sctg/sentencepiece-js";

const useStyles = makeStyles({
  root: {
    // width: "100%",
    // margin: "auto",
  },
  field: {},
  textarea: {
    margin: "1em",
    display: "block",
    minHeight: "300px",
  },
  textareain: {
    width: "100%",
    maxHeight: 'unset',
    minHeight: '300px',
    maxWidth: 'unset',
  },
  result: {
    margin: "1em",
  },
  button: {},
});

function TextAnalyzer() {
  const styles = useStyles();
  const textAnalyserId = useId();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  const [tokenCount, setTokenCount] = useState(0);
  const [tokens, setTokens] = useState<string>("");

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
      const decoded = processor.encodePieces(cleanedText);
      const count = tokens.length;
      setTokenCount(count);
      setTokens(decoded.join(" "));
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <CardPreview className={styles.root}>
      <Field size="small" className={styles.field}>
        <Textarea
          className={styles.textarea}
          textarea={{ className: styles.textareain }}
          appearance="outline"
          id={textAnalyserId}
          ref={textAreaRef}
          placeholder="Enter text or drop a text file"
          onDrop={handleDrop}
          onChange={(event) => setText(event.target.value)}
        ></Textarea>
      </Field>
      <Text style={{width:"unset"}} className={styles.result} block>
        <Button
          appearance="primary"
          onClick={calculateTokenCount}
          className={styles.button}
        >
          Token count
        </Button>
        {tokenCount > 0 && (
          <div>
            {tokenCount} <a onClick={toggleVisibility} style={{ cursor: 'pointer' }}>tokens</a> 
            <span ref={resultRef} style={{ display: isVisible ? 'inline' : 'none' }}>:<br/>{tokens}</span>
          </div>
        )}
      </Text>
    </CardPreview>
  );
}

export default TextAnalyzer;
