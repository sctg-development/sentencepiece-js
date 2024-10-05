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
    margin: "auto",
    width: "720px",
    maxWidth: "100%",
  },
  footer: {
  },
});
function App() {
  const styles = useStyles();
  return (
    <>
      <Card className={styles.card}>
        <CardHeader
          header={
            <Body1>
              <b>LLama 3.1 Token counter</b>
            </Body1>
          }
        />
        <TextAnalyzer />
        <CardFooter className={styles.footer}>
          <b>Copyright 2024 Ronan Le Meillat</b>
        </CardFooter>
      </Card>
    </>
  );
}

export default App;
