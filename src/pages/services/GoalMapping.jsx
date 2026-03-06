import { useEffect, useState } from "react";
import ChatWindow from "../../components/chat/ChatWindow";
import apiClient from "../../api/apiClient";

export default function GoalMapping() {
  const [messages, setMessages] = useState([]);

  const chatId = 1;
  const agentId = "1";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await apiClient.get(`/chat/${chatId}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };

    fetchMessages();
  }, []);

const sendMessage = async (data) => {
  try {
    const formData = new FormData();

    if (data.type === "text") {
      formData.append("message", data.text);
    }

    if (data.type === "file") {
      formData.append("file", data.file);
    }

    if (data.type === "voice") {
      formData.append("file", data.file);
      formData.append("message", "voice message");
    }

    formData.append("targetLang", data.language);

    const res = await apiClient.post(
      `/chat/${chatId}/${agentId}/message`,
      formData
    );

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: res?.data?.reply }
    ]);

  } catch (err) {
    console.error("Send message error:", err);
  }
};
  return (
    <div>
      <h2>Goal Mapping</h2>

      <p>Convert your goals into structured roadmaps.</p>

      <ChatWindow
        messages={messages}
        setMessages={setMessages}
        sendMessage={sendMessage}
      />
    </div>
  );
}
