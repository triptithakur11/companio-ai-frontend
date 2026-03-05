import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  FlagOutlined,
  FileTextOutlined,
  BulbOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ navigate }) => {

  return (
    <Sider breakpoint="lg" collapsedWidth="0">

      <Menu theme="dark" mode="inline">

        <Menu.Item
          icon={<DashboardOutlined />}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Menu.Item>

        <Menu.SubMenu icon={<FlagOutlined />} title="Services">

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
    </Sider>
  );
};

export default Sidebar;