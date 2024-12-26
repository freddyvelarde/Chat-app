import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { conversation } from "../../../config/endpoints";
import useAuth from "../../../hooks/useAuth";
import useConversationId from "../../../hooks/useConversationId";
import useNewMessage from "../../../hooks/useNewMessage";

const ChatContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  min-height: 90vh;
  overflow-y: auto;
  padding: 20px;
  background-color: ${(props) => props.theme.bg};
`;

const MessageWrapper = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.isCurrentUser ? "flex-end" : "flex-start"};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div<{ isCurrentUser: boolean }>`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 18px;
  background-color: ${(props) =>
    !props.isCurrentUser ? props.theme.btn : props.theme.fg};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 5px;
  display: block;
`;

const MessageContent = styled.p`
  margin: 0;
  word-wrap: break-word;
`;

const NoMessages = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #888;
`;

const Messages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const { token, user } = useAuth();
  const { conversationId } = useConversationId();
  const { newMessage } = useNewMessage();

  const chatContainerRef = useRef<HTMLDivElement>(null); // Reference for the chat container

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

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (conversationId) {
      getConversation();
    }
  }, [token, conversationId]);

  useEffect(() => {
    if (newMessage && newMessage.conversationId === conversationId) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom(); // Scroll to the bottom when a new message is added
    }
  }, [newMessage]);

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages are initially loaded
  }, [messages]);

  return (
    <ChatContainer ref={chatContainerRef}>
      {conversationId && messages.length > 0 ? (
        messages.map((message) => (
          <MessageWrapper
            key={message.id}
            isCurrentUser={message.sender?.id === user.id} // Handle undefined sender
          >
            <MessageBubble isCurrentUser={message.sender?.id === user.id}>
              <Username>{message.sender?.username || "Unknown User"}</Username>{" "}
              {/* Fallback username */}
              <MessageContent>
                {message.content || "No content"}
              </MessageContent>{" "}
              {/* Fallback content */}
            </MessageBubble>
          </MessageWrapper>
        ))
      ) : (
        <NoMessages>No messages yet</NoMessages>
      )}
    </ChatContainer>
  );
};

export default Messages;
