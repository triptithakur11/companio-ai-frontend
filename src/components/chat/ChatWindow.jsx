import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatWindow({ messages, setMessages, sendMessage }) {
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    const el = messagesRef.current;

    if (!el) return;

    const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;

    setShowScroll(!isBottom);
  };

  const handleSend = async (data) => {
    if (data.type === "text") {
      setMessages((prev) => [...prev, { role: "user", content: data.text }]);
    }

    if (data.type === "file") {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `📎 ${data.file.name}` },
      ]);
    }

    if (data.type === "voice") {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: "🎤 Voice Message" },
      ]);
    }

    setLoading(true);
    await sendMessage(data);
    setLoading(false);
  };

  return (
    <div
      style={{
        height: "78vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        ref={messagesRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 20,
          position: "relative",
        }}
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}

        {loading && <div>AI thinking...</div>}

        {showScroll && (
          <button
            onClick={scrollToBottom}
            style={{
              position: "fixed",
              bottom: 90,
              right: 30,
              borderRadius: "50%",
              width: 40,
              height: 40,
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ↓
          </button>
        )}
      </div>

      <div
        style={{
          position: "sticky",
          bottom: -20,
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
