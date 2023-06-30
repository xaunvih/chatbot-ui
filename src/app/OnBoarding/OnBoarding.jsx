import { Typography, Card, Row, Col } from "antd";
import Icon, {
  SearchOutlined,
  CloudOutlined,
  TranslationOutlined,
  AlertOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import styles from "./OnBoarding.module.scss";

const { Title, Paragraph } = Typography;
const responsiveCard = {
  xl: 12,
  xs: 24,
};

function OnBoarding() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Title level={1}>Kiki</Title>
          <Paragraph>
            Khám phá một thế giới thông tin phong phú với trợ lý thông minh của
            chúng tôi.
          </Paragraph>
          <Paragraph>
            Kiki sẽ giúp bạn tìm kiếm và khám phá đa dạng nội dung hữu ích, từ
            thông tin lịch sử, khoa học đến tin tức, thời tiết và nhiều hơn nữa.
          </Paragraph>
        </header>
        <Row gutter={[8, 8]}>
          <Col {...responsiveCard}>
            <Card className={styles.card}>
              <Title level={4}>
                <Icon component={SearchOutlined} /> Tra cứu thông tin
              </Title>
              <Paragraph>
                Khám phá kiến thức bổ ích về lịch sử, khoa học, địa lý và nghệ
                thuật từ các nguồn đáng tin cậy.
              </Paragraph>
            </Card>
          </Col>
          <Col {...responsiveCard}>
            <Card className={styles.card}>
              <Title level={4}>
                <Icon component={CloudOutlined} /> Thời tiết
              </Title>
              <Paragraph>
                Cập nhật thông tin thời tiết hiện tại và dự báo cho nhiều địa
                điểm khác nhau.
              </Paragraph>
            </Card>
          </Col>
          <Col {...responsiveCard}>
            <Card className={styles.card}>
              <Title level={4}>
                <Icon component={TranslationOutlined} /> Dịch thuật
              </Title>
              <Paragraph>
                Dễ dàng dịch thuật giữa các ngôn ngữ, giúp bạn giao tiếp một
                cách dễ dàng.
              </Paragraph>
            </Card>
          </Col>
          <Col {...responsiveCard}>
            <Card className={styles.card}>
              <Title level={4}>
                <Icon component={AlertOutlined} /> Tin tức
              </Title>
              <Paragraph>
                Cập nhật nhanh chóng về tin tức từ các nguồn uy tín và tin tức
                trong các lĩnh vực khác nhau.
              </Paragraph>
            </Card>
          </Col>
          <Col {...responsiveCard}>
            <Card className={styles.card}>
              <Title level={4}>
                <Icon component={EnvironmentOutlined} /> Địa điểm
              </Title>
              <Paragraph>
                Tìm kiếm và khám phá địa điểm, nhà hàng, quán café và dịch vụ
                khác trong khu vực của bạn.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default OnBoarding;
