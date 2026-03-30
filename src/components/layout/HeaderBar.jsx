import { Button, Flex, Layout, Switch } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Handshake, Settings } from "lucide-react";
import VoiceSettingsModal from "../dashboard/VoiceSettingsModal";

const { Header } = Layout;

export default function HeaderBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const handleOpenSettingsModal = () => {
    setOpenSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setOpenSettingsModal(false);
  };

  return (
    <Header
      style={{
        background: theme === "dark" ? "#001529" : "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Flex>
        <Handshake
          size={25}
          style={{
            marginTop: 20,
            marginRight: 5,
            color: theme === "dark" ? "#fff" : "#000",
          }}
        />{" "}
        <h2 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
          Companio AI
        </h2>
      </Flex>

      <Flex gap={10} align="center">
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Button
          icon={<Settings size={20} />}
          onClick={handleOpenSettingsModal}
          style={{ paddingTop: 5 }}
        />
      </Flex>

      <VoiceSettingsModal
        open={openSettingsModal}
        onClose={handleCloseSettingsModal}
      />
    </Header>
  );
}