import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Typography } from "antd";
import styles from "./MessagesList.module.scss";

function UserAvatar() {
  return (
    <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
  );
}
function AssistantAvatar() {
  return (
    <Avatar style={{ backgroundColor: "#0055bb", color: "#fff" }}>Kiki</Avatar>
  );
}

function MessagesList({ messages }) {
  if (!messages.length) return null;
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                description={
                  <Typography.Paragraph>{message.content}</Typography.Paragraph>
                }
                avatar={
                  message.role === "user" ? <UserAvatar /> : <AssistantAvatar />
                }
              />
            </List.Item>
          )}
        />
      </div>
    </section>
  );
}

export default MessagesList;
