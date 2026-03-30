import { Card, Row, Col } from "antd";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function StatsCards({ data }) {
  const [goals, setGoals] = useState([]);
  const { theme } = useContext(ThemeContext);

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
        <Card
          title={<span style={{ color: theme === "dark" ? "#fff" : "#000" }}>Total Goals</span>}
          style={{
            background: theme === "dark" ? "#001529" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          {goals.length}
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card
          title={<span style={{ color: theme === "dark" ? "#fff" : "#000" }}>Completed Goals</span>}
          style={{
            background: theme === "dark" ? "#001529" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          {doneCount}
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card
          title={<span style={{ color: theme === "dark" ? "#fff" : "#000" }}>Pending Goals</span>}
          style={{
            background: theme === "dark" ? "#001529" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          {pendingCount}
        </Card>
      </Col>
    </Row>
  );
}