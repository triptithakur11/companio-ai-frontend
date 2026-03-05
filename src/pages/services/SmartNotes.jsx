import ChatWindow from "../../components/chat/ChatWindow";
import apiClient from "../../api/apiClient";
import { API } from "../../api/endpoints";

export default function SmartNotes() {

  const sendMessage = async (message) => {

    const res = await apiClient.post(
      API.CHAT.MESSAGE(1, 6),
      { message }
    );

    return res.data.reply;
  };

  return (

    <div>

      <h2>Smart Notes</h2>

      <p>
        Upload notes and ask questions to understand them better.
      </p>

      <ChatWindow sendMessage={sendMessage} />

    </div>

  );
}