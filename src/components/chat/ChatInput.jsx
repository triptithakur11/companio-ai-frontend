import { Input, Button } from "antd";
import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");

  const handleSend = () => {

    if (!text) return;

    onSend(text);
    setText("");
  };

  return (

    <div style={{ display: "flex", gap: 10 }}>

      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button type="primary" onClick={handleSend}>
        Send
      </Button>

    </div>

  );
}