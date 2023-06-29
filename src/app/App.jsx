import styles from "./App.module.scss";
import "antd/dist/reset.css";
import OnBoarding from "./OnBoarding";
import TextBox from "./Textbox";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <OnBoarding />
      </div>
      <div className={styles.footer}>
        <TextBox />
      </div>
    </div>
  );
}

export default App;
