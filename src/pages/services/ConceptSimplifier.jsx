import ChatWindow from "../../components/chat/ChatWindow";

export default function ConceptSimplifier() {

  const sendMessage = async (msg) => {

    return "Concept explanation coming...";
  };

  return (

    <div>

      <h2>Concept Simplifier</h2>

      <ChatWindow sendMessage={sendMessage} />

    </div>

  );
}