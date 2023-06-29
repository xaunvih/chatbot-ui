import { Input } from "antd";
import styles from "./Textbox.module.scss";
import Icon, { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import DotLoading from "../DotLoading";
const { TextArea } = Input;

function TextBox() {
  const [message, setMesssage] = useState("");
  function onChanged(evt) {
    setMesssage(evt.target.value || "");
  }
  function onSubmit() {
    console.log("message: ", message);
    setMesssage();
  }
  function onPressEntered(evt) {
    if (!evt.shiftKey) {
      evt.preventDefault();
      onSubmit();
    }
  }
  return (
    <section>
      <div className={styles.wrapper}>
        <TextArea
          className={styles.textbox}
          placeholder="Nhập một câu hỏi..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={onChanged}
          onPressEnter={onPressEntered}
          value={message}
        />
        <Icon
          onClick={onSubmit}
          className={styles.icon}
          component={SendOutlined}
        />
      </div>
    </section>
  );
}

export default TextBox;
