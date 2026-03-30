import { Layout } from "antd";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const { Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar navigate={navigate} />
      <Layout>
        <HeaderBar />
        <Content
          style={{
            padding: 16,
            background: theme === "dark" ? "black" : "#f5f5f5",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}