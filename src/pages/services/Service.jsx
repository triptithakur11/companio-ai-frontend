import { useContext, useEffect, useState } from "react";
import ChatWindow from "../../components/chat/ChatWindow";
import apiClient from "../../api/apiClient";
import {
  DeleteOutlined,
  FileOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Flex, Spin, message } from "antd";
import { SERVICES } from "../../constants/servicesConfig";
import GoalsModal from "../../components/goals/GoalsModal";
import { ThemeContext } from "../../context/ThemeContext";

export default function Service({ service }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [goalModal, setGoalModal] = useState(false);
  const [goalLoading, setGoalLoading] = useState(false);
  const [goals, setGoals] = useState([]);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const serviceConfig = SERVICES[service];
  const chatId = serviceConfig.chatId;
  const agentId = serviceConfig.agentId;

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/chat/${chatId}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [service]);

  const sendMessage = async (data) => {
    try {
      const formData = new FormData();

      if (data.text) formData.append("message", data.text);
      if (data.language) formData.append("targetLang", data.language);

      if (data.files?.length) {
        data.files.forEach((file) => formData.append("files", file));
      }

      if (data.voice) formData.append("voice", data.voice);

      const voiceSettings = JSON.parse(
        localStorage.getItem("user"),
      )?.voiceSettings;

      if (voiceSettings) {
        formData.append("voiceSettings", JSON.stringify(voiceSettings));
      }
      console.log(formData.get("voiceSettings"));
      const res = await apiClient.post(
        `/chat/${chatId}/${agentId}/message`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60000,
          transformRequest: [(data) => data],
        },
      );

      return res;
    } catch (err) {
      message.error("Failed to send message: " + err.response?.data?.error);
      console.error("Send message error:", err);
    }
  };

  const resetChat = async () => {
    try {
      await apiClient.delete(`/chat/${chatId}/reset`);
      setMessages([]);
    } catch (err) {
      console.error("Reset chat error:", err);
    }
  };

  const generateGoals = async () => {
    try {
      setGoalLoading(true);
      const res = await apiClient.post("goals/generate/1");
      setGoals(res?.data?.goals);
      setGoalModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setGoalLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "calc(100vh - 100px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex justify="space-between" align="center">
        <h2 style={{ color: isDark ? "#fff" : "#000" }}>
          {serviceConfig.name}
        </h2>

        <Flex gap={8}>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={resetChat}
            style={{
              background: isDark ? "#020617" : "#fff",
              border: isDark ? "1px solid #334155" : undefined,
              color: isDark ? "#e2e8f0" : undefined,
            }}
          >
            Reset Chat
          </Button>

          {agentId === "1" && (
            <Button
              type="primary"
              ghost
              icon={<FileOutlined />}
              onClick={generateGoals}
              loading={goalLoading}
            >
              Generate Goals
            </Button>
          )}
        </Flex>
      </Flex>

      <p style={{ color: isDark ? "#94a3b8" : "#555" }}>
        {serviceConfig.description}
      </p>

      {loading && (
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
      )}

      {!loading && messages.length === 0 && (
        <div
          style={{
            height: "calc(100vh - 100px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 12,
            marginTop: "10vh",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: isDark ? "#e2e8f0" : "#111827",
              margin: 0,
            }}
          >
            {serviceConfig.name}
          </h1>

          <p
            style={{
              maxWidth: 500,
              fontSize: "16px",
              color: isDark ? "#94a3b8" : "#6b7280",
              margin: 0,
            }}
          >
            {serviceConfig.description}
          </p>

          <p
            style={{
              fontSize: "14px",
              color: isDark ? "#64748b" : "#9ca3af",
              margin: 0,
            }}
          >
            Start a conversation below 👇
          </p>
        </div>
      )}

      <ChatWindow
        messages={messages}
        setMessages={setMessages}
        sendMessage={sendMessage}
      />

      <GoalsModal
        open={goalModal}
        setOpen={setGoalModal}
        goals={goals}
        chatId={chatId}
      />
    </div>
  );
}