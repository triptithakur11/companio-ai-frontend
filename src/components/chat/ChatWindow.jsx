import { useState, useRef, useEffect, useContext } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { ThemeContext } from "../../context/ThemeContext";

export default function ChatWindow({ messages, setMessages, sendMessage }) {
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const { theme } = useContext(ThemeContext);

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
    if (loading) return;
    console.log(data);
    let userMessage = {
      role: "user",
      text: null,
      files: [],
      voice: null,
      hasText: false,
    };

    // TEXT
    if (data.text && data.text.trim() !== "") {
      userMessage.text = data.text;
      userMessage.hasText = true;
    }

    // FILES (convert to preview URLs)
    if (data.files && data.files.length > 0) {
      userMessage.files = data.files.map((file) => {
        if (typeof file === "string") return file;

        return {
          url: URL.createObjectURL(file),
          name: file.name,
          type: file.type,
        };
      });
    }

    // VOICE
    if (data.voice) {
      userMessage.voice =
        typeof data.voice === "string"
          ? data.voice
          : URL.createObjectURL(data.voice);
    }

    // FINAL PUSH (only once)
    setMessages((prev) => [...prev, { ...userMessage }]);

    setLoading(true);

    try {
      const res = await sendMessage(data);
      console.log(res?.data);
      const aiMessage = {
        role: "assistant",
        text: res?.data?.reply || "",
        voice: res?.data?.voiceUrl || null,
        files: res?.data?.filesUrls || [],
        hasText: !res?.data?.voiceUrl,
        autoPlay: true,
      };
      setMessages((prev) => [...prev, { ...aiMessage }]);
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
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
              background: theme === "dark" ? "#fff" : "#000",
              color: theme === "dark" ? "#000" : "#fff",
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
          bottom: 0,
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: 10,
          borderRadius: 10,
          width: "100%",
        }}
      >
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}