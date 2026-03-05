import { Layout } from "antd";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import { Outlet, useNavigate } from "react-router-dom";

const { Content } = Layout;

export default function AppLayout() {

  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Sidebar navigate={navigate} />

      <Layout>

        <HeaderBar />

        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>

      </Layout>

    </Layout>
  );
}