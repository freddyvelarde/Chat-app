import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { ChatStyles } from "./styles/ChatStyles";

const Chat = () => {
  return (
    <ChatStyles>
      <hr />
      <Messages />
      <ChatInput />
      <hr />
    </ChatStyles>
  );
};
export default Chat;
