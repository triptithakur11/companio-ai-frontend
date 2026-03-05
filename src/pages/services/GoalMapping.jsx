import ChatWindow from "../../components/chat/ChatWindow";

export default function GoalMapping() {

  const sendMessage = async (msg) => {

    return "Goal mapping AI response...";
  };

  return (

    <div>

      <h2>Goal Mapping</h2>

      <p>
        Convert your goals into structured roadmaps.
      </p>

      <ChatWindow sendMessage={sendMessage} />

    </div>

  );
}