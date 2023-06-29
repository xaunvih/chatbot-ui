import styles from "./App.module.scss";
import "antd/dist/reset.css";
import OnBoarding from "./OnBoarding";
import TextBox from "./Textbox";
import { fetchStream } from "../services/openAI";
import { useState } from "react";
import MessagesList from "./MessagesList";

function App() {
  const [messages, updateMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  function onSubmit(message) {
    const messageItem = { role: "user", content: message };
    const newMessages = [...messages, messageItem];
    updateMessages(newMessages);

    const { length } = newMessages;
    fetchStream({
      messages: newMessages,
      onMessage(text) {
        if (newMessages.length > length) {
          newMessages.pop();
        }
        updateMessages([...newMessages, { role: "assistant", content: text }]);
      },
      onStart() {
        setLoading(true);
      },
      onEnd() {
        setLoading(false);
      },
      onError() {
        setLoading(false);
      },
    });
  }
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        {!messages.length && <OnBoarding />}
        <MessagesList messages={messages} />
      </div>
      <div className={styles.footer}>
        <TextBox isLoading={isLoading} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default App;
