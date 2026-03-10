import { useEffect, useState } from "react";
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

export default function Service({ service }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [goalModal, setGoalModal] = useState(false);
  const [goalLoading, setGoalLoading] = useState(false);
  const [goals, setGoals] = useState([]);
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

      if (data.text) {
        formData.append("message", data.text);
      }

      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      }

      if (data.voice) {
        formData.append("voice", data.voice);
      }

      if (data.language) {
        formData.append("targetLang", data.language);
      }

      const res = await apiClient.post(
        `/chat/${chatId}/${agentId}/message`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: [(data) => data],
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: data.text || "",
          files: res?.data?.filesUrls || [],
          voice: res?.data?.voiceUrl || null,
        },
        {
          role: "assistant",
          text: res?.data?.reply || "",
          files: [],
          voice: null,
        },
      ]);
    } catch (err) {
      message.error("Failed to send message: " + err.response.data.error);
      console.error("Send message error:", err);
    }
  };

  const resetChat = async () => {
    try {
      const res = await apiClient.delete(`/chat/${chatId}/reset`);
      console.log(res?.data);
      setMessages([]);
    } catch (err) {
      console.error("Reset chat error:", err);
    }
  };

  const generateGoals = async () => {
    try {
      setGoalLoading(true);
      const res = await apiClient.post("goals/generate/1");
      console.log(res?.data?.goals);
      setGoals(res?.data?.goals);
      setGoalModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setGoalLoading(false);
    }
  };

  return (
    <div>
      <Flex justify="space-between" align="center">
        <h2>{serviceConfig.name} </h2>
        <Flex gap={4}>
          <Button danger icon={<DeleteOutlined />} onClick={resetChat}>
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

      <p>{serviceConfig.description}</p>
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
