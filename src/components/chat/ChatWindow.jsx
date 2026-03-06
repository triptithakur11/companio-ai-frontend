import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatWindow({ messages, setMessages, sendMessage }) {

  const [loading, setLoading] = useState(false);

  const handleSend = async (data) => {

    if (data.type === "text") {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: data.text }
      ]);
    }

    if (data.type === "file") {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `📎 ${data.file.name}` }
      ]);
    }

    if (data.type === "voice") {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: "🎤 Voice Message" }
      ]);
    }

    setLoading(true);

    await sendMessage(data);

    setLoading(false);
  };

  return (

    <div>

      <div style={{ minHeight: 400, marginBottom: 20 }}>

        {messages.map((m, i) => (
          <MessageBubble key={i} {...m} />
        ))}

        {loading && <div>AI thinking...</div>}

      </div>

      <ChatInput onSend={handleSend} />

    </div>
  );
}