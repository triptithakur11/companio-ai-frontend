import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatWindow({ sendMessage }) {

  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {

    const userMsg = { role: "user", content: text };

    setMessages((prev) => [...prev, userMsg]);

    const reply = await sendMessage(text);

    const aiMsg = { role: "assistant", content: reply };

    setMessages((prev) => [...prev, aiMsg]);
  };

  return (

    <div>

      <div style={{ minHeight: 400, marginBottom: 20 }}>

        {messages.map((m, i) => (
          <MessageBubble key={i} {...m} />
        ))}

      </div>

      <ChatInput onSend={handleSend} />

    </div>

  );
}