import { Card, Row, Col } from "antd";

export default function StatsCards() {

  return (

    <Row gutter={16}>

      <Col xs={24} md={8}>
        <Card title="Goals Completed">
          8
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="Goals In Progress">
          4
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="Pending Goals">
          3
        </Card>
      </Col>

    </Row>

  );
}