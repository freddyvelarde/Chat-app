import { ChangeEvent, SyntheticEvent, useState } from "react";
import { sendMessage } from "../../../config/endpoints";
import useAuth from "../../../hooks/useAuth";
import useConversationId from "../../../hooks/useConversationId";
import useNewMessage from "../../../hooks/useNewMessage";
// import { useSocket } from "../../../hooks/useSocket";
// import { useSocket } from "../../../hooks/useSocket";

const ChatInput = () => {
  // const {socket} = useSocket();
  const { conversationId } = useConversationId();
  const { handleNewMessage } = useNewMessage();
  const [message, setMessage] = useState<string>();
  const { token } = useAuth();
  // const { socket } = useSocket();

  const sendMessageToServer = async () => {
    const req = await fetch(sendMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: message,
        conversationId,
      }),
    });
    const res = await req.json();
    handleNewMessage(res);
    // setResponse(res);
    // socket?.on('message')
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // socket?.emit("message", conversationId);

    if (conversationId) {
      sendMessageToServer();
    } else {
      console.log("no conversation id to send the message");
    }
    setMessage("");
    // console.log(message);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        value={message}
        type="text"
        placeholder="write your message"
        onChange={handleOnChange}
      />
      <button>send</button>
    </form>
  );
};
export default ChatInput;
