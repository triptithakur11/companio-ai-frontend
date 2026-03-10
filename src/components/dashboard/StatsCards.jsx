import { Card, Row, Col } from "antd";
import { useEffect, useState } from "react";

export default function StatsCards({ data }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (data) {
      setGoals(data);
    }
  }, [data]);

  const doneCount = goals.filter((g) => g.isDone).length;
  const pendingCount = goals.length - doneCount;

  return (
    <Row gutter={16}>
      <Col xs={24} md={8}>
        <Card title="Total Goals">{goals.length}</Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="Completed Goals">{doneCount}</Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="Pending Goals">{pendingCount}</Card>
      </Col>
    </Row>
  );
}
