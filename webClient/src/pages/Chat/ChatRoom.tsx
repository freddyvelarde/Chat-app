// // import { useParams } from "react-router-dom";
// import { allConversationsByUser, sendMessage } from "../../config/endpoints";
// import {
//   ChangeEvent,
//   // FormEventHandler,
//   SyntheticEvent,
//   useEffect,
//   useState,
// } from "react";
// import useAuth from "../../hooks/useNewMessage.ts/useAuth";
// import { useSocket } from "../../hooks/useNewMessage.ts/useSocket";
// import Messages from "../Home/Chat/Messages";
// // import useListenMessages from "../../hooks/useListenMessages";
//
// interface IMessage {
//   content: string;
//   conversationId: string;
//   editedAt: Date;
//   id: string;
//   senderId: string;
//   sentAt: Date;
//   sender: {
//     username: string;
//   };
// }
// interface INewMessage {
//   newMessage: {
//     id: string;
//     conversationId: string;
//     senderId: string;
//     content: string;
//     sentAt: Date;
//     editedAt: Date;
//   };
// }
//
// interface IChatRoomProps {
//   chatId: string;
// }
// const ChatRoom = ({ chatId }: IChatRoomProps) => {
//   // useListenMessages();
//   // const { chatId } = useParams();
//   const { token } = useAuth();
//   const [response, setResponse] = useState<IMessage[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const { socket } = useSocket();
//
//   const getConversation = async () => {
//     const req = await fetch(`${allConversationsByUser}/${chatId}`, {
//       method: "GET",
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     const res = await req.json();
//     setResponse(res);
//     // console.log(response);
//   };
//   const handleSendMessage = async () => {
//     const req = await fetch(sendMessage, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         message,
//         conversationId: chatId,
//       }),
//     });
//     const res: INewMessage = await req.json();
//
//     console.log(`new Message: ${res.newMessage}`);
//     // setResponse([...response, res.newMessage]);
//   };
//
//   useEffect(() => {
//     getConversation();
//   }, [token]);
//
//   const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
//   };
//
//   const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//
//     handleSendMessage();
//     socket?.emit(message, chatId);
//     // sendMessageRealTime(message, chatId as string);
//     setMessage("");
//     console.log(response);
//   };
//
//   return (
//     <>
//       <button onClick={getConversation}>All Conversation</button>
//
//       <form onSubmit={handleOnSubmit}>
//         <input
//           type="text"
//           value={message}
//           placeholder="Write a message"
//           onChange={handleOnChange}
//         />
//         <button>send</button>
//       </form>
//     </>
//   );
// };
//
// export default ChatRoom;
