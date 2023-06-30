import styles from "./App.module.scss";
import "antd/dist/reset.css";
import OnBoarding from "./OnBoarding";
import TextBox from "./Textbox";
import { fetchStream } from "../services/openAI";
import { useRef, useState } from "react";
import MessagesList from "./MessagesList";

function App() {
  const [messages, updateMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const controlerRef = useRef();

  function onSubmit(message) {
    let newMessages = messages;
    if (message) {
      const messageItem = { role: "user", content: message };
      newMessages = [...messages, messageItem];
      updateMessages(newMessages);
    }

    const { length } = newMessages;
    fetchStream({
      messages: newMessages,
      onMessage(text, controller) {
        controlerRef.current = controller;
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

  function onStop() {
    controlerRef.current?.abort();
    setLoading(false);
  }
  function onRegenerate() {
    onSubmit();
  }
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        {!messages.length && <OnBoarding />}
        <MessagesList messages={messages} />
      </div>
      <div className={styles.footer}>
        <TextBox
          isLoading={isLoading}
          onSubmit={onSubmit}
          messages={messages}
          onStop={onStop}
          onRegenerate={onRegenerate}
        />
      </div>
    </div>
  );
}

export default App;
