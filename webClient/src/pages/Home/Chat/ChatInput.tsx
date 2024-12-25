import { ChangeEvent, SyntheticEvent, useState } from "react";
import { sendMessage } from "../../../config/endpoints";
import useAuth from "../../../hooks/useAuth";
import useConversationId from "../../../hooks/useConversationId";
// import { useSocket } from "../../../hooks/useSocket";
// import { useSocket } from "../../../hooks/useSocket";

const ChatInput = () => {
  // const {socket} = useSocket();
  const { conversationId } = useConversationId();
  const [newMessage, setNewMessage] = useState<string>();
  const { token } = useAuth();
  // const { socket } = useSocket();

  const sendMessageToServer = async () => {
    await fetch(sendMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: newMessage,
        conversationId,
      }),
    });
    // const res = await req.json();
    // socket?.on('newMessage')
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // socket?.emit("newMessage", conversationId);

    if (conversationId) {
      sendMessageToServer();
    } else {
      console.log("no conversation id to send the message");
    }
    setNewMessage("");
    // console.log(newMessage);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        value={newMessage}
        type="text"
        placeholder="write your message"
        onChange={handleOnChange}
      />
      <button>send</button>
    </form>
  );
};
export default ChatInput;
