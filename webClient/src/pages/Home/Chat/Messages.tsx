import { useEffect, useState } from "react";
import { conversation } from "../../../config/endpoints";
// import useListenMessages from "../../../hooks/useListenMessages";
import useAuth from "../../../hooks/useAuth";
import useConversationId from "../../../hooks/useConversationId";
import useNewMessage from "../../../hooks/useNewMessage";

const Messages = () => {
  const [messages, setMessages] = useState<any>();
  const { token } = useAuth();
  const { conversationId } = useConversationId();
  const { newMessage } = useNewMessage();

  const getConversation = async () => {
    const req = await fetch(`${conversation}/${conversationId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    setMessages(res);
    console.log("Fetching conversation with id:", conversationId);
  };
  useEffect(() => {
    if (conversationId) {
      getConversation();
    }
  }, [token, conversationId]);

  useEffect(() => {
    if (conversationId == newMessage.conversationId && messages) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage]);

  return (
    <>
      {" "}
      {conversationId && messages ? (
        messages?.map((message: any) => (
          <div key={message.id}>
            <p>
              {message.sender.username}: {message.content}
            </p>
          </div>
        ))
      ) : (
        <span>no messages yet</span>
      )}
    </>
  );
};

export default Messages;
