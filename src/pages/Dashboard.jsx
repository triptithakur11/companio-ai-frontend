import { Row, Col, Card, Spin } from "antd";
import GoalsTable from "../components/dashboard/GoalsTable";
import GoalCharts from "../components/dashboard/GoalCharts";
import StatsCards from "../components/dashboard/StatsCards";
import apiClient from "../api/apiClient";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LoadingOutlined } from "@ant-design/icons";

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    const res = await apiClient.get("/goals");
    setGoals(res.data.goals || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "100%",
        }}
      />
    );
  }

  return (
    <div>
      <StatsCards data={goals} />
      <Row gutter={16} style={{ marginTop: 5 }}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <span style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                Goals Overview
              </span>
            }
            style={{ background: theme === "dark" ? "#001529" : "#fff" }}
          >
            <GoalsTable data={goals} />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <span style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                Goal Analytics
              </span>
            }
            style={{ background: theme === "dark" ? "#001529" : "#fff" }}
          >
            <GoalCharts data={goals} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}