import { Input } from "antd";
import styles from "./Textbox.module.scss";
import Icon, { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Spin } from "antd";

const { TextArea } = Input;

function TextBox({ onSubmit, isLoading }) {
  const [message, setMesssage] = useState("");
  function onChanged(evt) {
    setMesssage(evt.target.value || "");
  }
  function onIconClick() {
    onSubmit(message);
    setMesssage();
  }
  function onPressEntered(evt) {
    if (!evt.shiftKey && !isLoading) {
      evt.preventDefault();
      onSubmit(message);
      setMesssage();
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
        {!isLoading ? (
          <Icon
            onClick={onIconClick}
            className={styles.icon}
            component={SendOutlined}
          />
        ) : (
          <Spin size="small" className={styles.icon} />
        )}
      </div>
    </section>
  );
}

export default TextBox;
