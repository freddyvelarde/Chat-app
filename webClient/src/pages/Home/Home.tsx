import useAuth from "../../hooks/useAuth";
// import useConversationId from "../../hooks/useConversationId";
import useListenMessages from "../../hooks/useListenMessages";
import { useSocket } from "../../hooks/useSocket";
// import { useSocket } from "../../hooks/useSocket";
import Chat from "./Chat/Chat";
import ChatDashboard from "./ChatDashboard/ChatDashboard";

const Home = () => {
  const { clearAuthUser } = useAuth();
  const { socketRef } = useSocket();
  // const { conversationId } = useConversationId();
  useListenMessages();

  return (
    <div>
      <ChatDashboard />
      <Chat />
      <button onClick={clearAuthUser}>Log out</button>
      <button
        onClick={() => {
          console.log(socketRef);
        }}
      >
        print socket
      </button>
    </div>
  );
};

export default Home;
// {selectedConversation ? (
//   <div>
//     <div>
//       {messages.map((message) => (
//         <div key={message.id}>
//           <p>{message.sender.username}</p>
//           <p>{message.content}</p>
//         </div>
//       ))}
//     </div>
//
//     <form onSubmit={sendMessageHandle}>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button type="submit">Send</button>
//     </form>
//   </div>
// ) : (
