export default function MessageBubble({ role, content }) {

  const isUser = role === "user";

  return (

    <div
      style={{
        textAlign: isUser ? "right" : "left",
        marginBottom: 10
      }}
    >

      <div
        style={{
          display: "inline-block",
          padding: 10,
          borderRadius: 10,
          background: isUser ? "#3B82F6" : "#e5e5e5",
          color: isUser ? "#fff" : "#000",
          maxWidth: "70%"
        }}
      >
        {content}
      </div>

    </div>

  );
}