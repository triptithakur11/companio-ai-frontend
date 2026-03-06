import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import ChatWindow from "../../components/chat/ChatWindow";

export default function HumanSupport() {
  const [messages, setMessages] = useState([]);

  const chatId = 7;
  const agentId = "5";

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
        formData,
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res?.data?.reply },
      ]);
    } catch (err) {
      console.error("Send message error:", err);
    }
  };
  return (

    <div>

      <h2>Human Support</h2>

      <p>
        Connect with mentors and experts.
      </p>
 <ChatWindow
        messages={messages}
        setMessages={setMessages}
        sendMessage={sendMessage}
      />
    </div>

  );
}