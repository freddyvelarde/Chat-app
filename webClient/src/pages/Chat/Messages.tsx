import useListenMessages from "../../hooks/useListenMessages";

const Messages = ({ response }) => {
  useListenMessages();
  return (
    <>
      {response?.map((message: any) => (
        <div key={message.id}>
          <li> ------- {message.sender.username}</li>
          <p>{message.content}</p>
        </div>
      ))}
    </>
  );
};

export default Messages;
