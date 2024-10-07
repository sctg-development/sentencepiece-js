import "./App.css";
import TextAnalyzer from "./components/TextAnalyzer";
import {
  Body1,
  Card,
  CardFooter,
  CardHeader,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    width: "80vw",
    maxWidth: "1024px",
  },
  footer: {
  },
});
function App() {
  const styles = useStyles();
  return (
    <>
      <Card className={styles.card} size="large" >
        <CardHeader
          header={
            <Body1>
              <b>LLama 3.1 Tokenizer and counter</b>
            </Body1>
          }
        />
        <TextAnalyzer />
        <CardFooter className={styles.footer}>
          <b>Copyright 2024 <a href="https://github.com/sctg-development/sentencepiece-js">Ronan Le Meillat</a></b>
        </CardFooter>
      </Card>
    </>
  );
}

export default App;
