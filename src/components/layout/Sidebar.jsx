import { Button, Layout, Menu, message } from "antd";
import {
  DashboardOutlined,
  FlagOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { removeToken } from "../../utils/storage";
import {
  ChartNoAxesCombined,
  Goal,
  Hammer,
  Merge,
  ReceiptText,
  Users,
} from "lucide-react";
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
      width={230}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        background: theme === "dark" ? "#001529" : "#fff",
        borderRight: "1px solid #e0e0e0",
        // height: "100%",
      }}
    >
      <Menu
        theme={theme}
        mode="inline"
        style={{
          background: theme === "dark" ? "#001529" : "#fff",
        }}
      >
        <Menu.Item
          icon={<DashboardOutlined />}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Menu.Item>

        <Menu.SubMenu key="services" icon={<FlagOutlined />} title="Services">
          <Menu.Item
            onClick={() => navigate("/services/goals")}
            icon={<Goal size={20} />}
          >
            Goal Mapping
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/services/notes")}
            icon={<ReceiptText size={20} />}
          >
            Smart Notes
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/services/revision")}
            icon={<ChartNoAxesCombined size={20} />}
          >
            Smart Revision
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/services/concepts")}
            icon={<Hammer size={20} />}
          >
            Concept Simplifier
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/services/resources")}
            icon={<Merge size={20} />}
          >
            Curated Resources
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/services/support")}
            icon={<Users size={20} />}
          >
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