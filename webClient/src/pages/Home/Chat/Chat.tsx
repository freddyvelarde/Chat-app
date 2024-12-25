import useConversationId from "../../../hooks/useConversationId";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const Chat = () => {
  const { conversationId } = useConversationId();

  return (
    <div>
      <hr />
      <span>Chat with id: {conversationId}</span>
      <Messages />

      <ChatInput />

      <hr />
    </div>
  );
};
export default Chat;
