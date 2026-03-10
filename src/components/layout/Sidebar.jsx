import { Button, Layout, Menu, message } from "antd";
import {
  DashboardOutlined,
  FlagOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { removeToken } from "../../utils/storage";
const { Sider } = Layout;

const Sidebar = ({ navigate }) => {
  const { theme } = useContext(ThemeContext);

  const logout = () => {
    removeToken();
    message.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ background: theme === "dark" ? "#001529" : "#fff" }}
    >
      <Menu theme={theme} mode="inline">
        <Menu.Item
          icon={<DashboardOutlined />}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Menu.Item>

        <Menu.SubMenu theme={theme} icon={<FlagOutlined />} title="Services">
          <Menu.Item onClick={() => navigate("/services/goals")}>
            Goal Mapping
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/services/notes")}>
            Smart Notes
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/services/revision")}>
            Smart Revision
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/services/concepts")}>
            Concept Simplifier
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/services/resources")}>
            Curated Resources
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/services/support")}>
            Human Support
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Button
        style={{ position: "absolute", bottom: 20, left: 40 }}
        danger
        ghost
        type="primary"
        icon={<LogoutOutlined />}
        onClick={logout}
      >
        Logout
      </Button>
    </Sider>
  );
};

export default Sidebar;
