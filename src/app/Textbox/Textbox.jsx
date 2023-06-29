import { Button, Input } from "antd";
import styles from "./Textbox.module.scss";
import Icon, {
  ReloadOutlined,
  SendOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Spin } from "antd";

const { TextArea } = Input;

function TextBox({ onSubmit, isLoading, messages, onStop, onRegenerate }) {
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

  function onBtnStopClick() {
    onStop();
  }

  function onBtnRegenerateClick() {
    onRegenerate();
  }

  return (
    <section>
      <div className={styles.wrapper}>
        {isLoading && (
          <Button
            key="btn-stop"
            className={styles.btnRegenerate}
            type="dashed"
            icon={<StopOutlined />}
            onClick={onBtnStopClick}
          >
            Dừng tạo câu trả lời
          </Button>
        )}
        {!isLoading && !!messages.length && (
          <Button
            key="btn-regenerate"
            className={styles.btnRegenerate}
            type="dashed"
            icon={<ReloadOutlined />}
            onClick={onBtnRegenerateClick}
          >
            Tạo lại câu trả lời
          </Button>
        )}

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
