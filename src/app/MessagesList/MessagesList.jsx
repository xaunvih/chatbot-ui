import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Typography } from "antd";
import styles from "./MessagesList.module.scss";
import { Spin } from "antd";

function UserAvatar() {
  return (
    <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
  );
}
function AssistantAvatar({ isLoading, isStreaming, isLast }) {
  const showLoading = isLast && isLoading && !isStreaming;
  if (showLoading) {
    return (
      <div className={styles.spinWrapper}>
        <Spin size="small" className={styles.icon} />
      </div>
    );
  }
  return (
    <Avatar
      className={styles.assistantAvatar}
      style={{ backgroundColor: "#0055bb", color: "#fff" }}
    >
      <span>Kiki</span>
    </Avatar>
  );
}

function MessagesList({ messages, isLoading, isStreaming }) {
  if (!messages.length) return null;
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message, index) => {
            const isLast = index === messages.length - 1;
            return (
              <List.Item key={index}>
                <List.Item.Meta
                  description={
                    <Typography.Paragraph>
                      {message.content}
                    </Typography.Paragraph>
                  }
                  avatar={
                    message.role === "user" ? (
                      <UserAvatar />
                    ) : (
                      <AssistantAvatar
                        isStreaming={isStreaming}
                        isLoading={isLoading}
                        isLast={isLast}
                      />
                    )
                  }
                />
              </List.Item>
            );
          }}
        />
      </div>
    </section>
  );
}

export default MessagesList;
