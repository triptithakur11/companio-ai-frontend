import { Row, Col, Card } from "antd";
import StatsCards from "../components/dashboard/StatsCards";
import GoalProgressChart from "../components/dashboard/GoalProgressChart";
import ExportPDFButton from "../components/dashboard/ExportPDFButton";

export default function Dashboard() {

  return (

    <div>

      <StatsCards />

      <Row gutter={16} style={{ marginTop: 20 }}>

        <Col xs={24} md={12}>
          <Card title="Goal Progress">
            <GoalProgressChart />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Reports">
            <ExportPDFButton />
          </Card>
        </Col>

      </Row>

    </div>
  );
}