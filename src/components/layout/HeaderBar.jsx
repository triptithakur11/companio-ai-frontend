import { Layout, Switch } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const { Header } = Layout;

export default function HeaderBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Companio AI</h2>

      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </Header>
  );
}
