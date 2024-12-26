import { ChangeEvent, SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { sendMessage } from "../../../config/endpoints";
import useAuth from "../../../hooks/useAuth";
import useConversationId from "../../../hooks/useConversationId";
import useNewMessage from "../../../hooks/useNewMessage";

const ChatInputContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.bg};
  border-top: 1px solid ${(props) => props.theme.mainText};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 5px;
  color: ${(props) => props.theme.mainText};
  background-color: ${(props) => props.theme.fg};
  color: ${(props) => props.theme.text};
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 5px ${(props) => props.theme.primary};
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.buttonText};
  background-color: ${(props) => props.theme.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }

  &:disabled {
    background-color: ${(props) => props.theme.disabled};
    cursor: not-allowed;
  }
`;

const ChatInput = () => {
  const { conversationId } = useConversationId();
  const { handleNewMessage } = useNewMessage();
  const [message, setMessage] = useState<string>("");
  const { token } = useAuth();

  const sendMessageToServer = async () => {
    const req = await fetch(sendMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });
    const res = await req.json();
    handleNewMessage(res);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (conversationId && message.trim()) {
      sendMessageToServer();
      setMessage("");
    } else {
      console.log("No conversation ID or message to send");
    }
  };

  return (
    <ChatInputContainer onSubmit={handleOnSubmit}>
      <Input
        value={message}
        type="text"
        placeholder="Write your message..."
        onChange={handleOnChange}
      />
      <Button disabled={!message.trim()}>Send</Button>
    </ChatInputContainer>
  );
};

export default ChatInput;
