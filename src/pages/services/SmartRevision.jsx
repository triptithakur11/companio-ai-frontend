import ChatWindow from "../../components/chat/ChatWindow";

export default function SmartRevision() {

  const sendMessage = async (msg) => {

    return "Revision question coming soon...";
  };

  return (

    <div>

      <h2>Smart Revision</h2>

      <p>
        AI will ask you questions to improve recall.
      </p>

      <ChatWindow sendMessage={sendMessage} />

    </div>

  );
}