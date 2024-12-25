import { useEffect, useState } from "react";
import { allConversationsByUser, sendMessage } from "../../config/endpoints";
import useAuth from "../../hooks/useAuth";
import useListenMessages from "../../hooks/useListenMessages";

interface Conversation {
  id?: string;
  createdAt?: Date;
  selected?: boolean | null;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: Date;
  sender: {
    username: string;
  };
}

const Home = () => {
  const [conversations, setConversations] = useState<Conversation[]>();
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { token, clearAuthUser } = useAuth();
  useListenMessages();

  const getAllConversationByUser = async () => {
    try {
      const req = await fetch(allConversationsByUser, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!req.ok) {
        throw new Error("Failed to fetch conversations");
      }

      const serverConversations: Pick<Conversation, "id" | "createdAt">[] =
        await req.json();

      // Map the server response to include the selected field
      const updatedConversations = serverConversations.map((conv) => ({
        ...conv,
        selected: false,
      }));

      setConversations(updatedConversations);
      console.log(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // const getAllConversationByUser = async () => {
  //   const req = await fetch(allConversationsByUser, {
  //     method: "GET",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const res: Conversation[] = await req.json();
  //   // setConversations(res);
  //
  //   for (let i = 0; i < res.length; i++ ) {
  //     const conversation: Conversation = res[i];
  //     let newConv: Conversation = {};
  //     newConv.id = conversation.id;
  //     newConv.createdAt = conversation.createdAt;
  //     newConv.selected = false;
  //
  //
  //     setConversations([ ...conversations, newConv]);
  //
  //
  //
  //
  //   }
  //
  // };

  const getMessagesForConversation = async (conversationId: string) => {
    try {
      const req = await fetch(`${allConversationsByUser}/${conversationId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();
      setMessages(res);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessageHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || !newMessage.trim()) return;

    try {
      await fetch(sendMessage, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: newMessage,
          conversationId: selectedConversation,
        }),
      });

      setNewMessage("");
      getMessagesForConversation(selectedConversation);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    getAllConversationByUser();
  }, [token]);

  useEffect(() => {
    if (selectedConversation) {
      getMessagesForConversation(selectedConversation);
    }
  }, [selectedConversation, token]);

  return (
    <div>
      <div>
        <h1>Conversations</h1>
        <button onClick={clearAuthUser}>Log out</button>
        <button onClick={getAllConversationByUser}>get all conv</button>

        <div>
          {conversations?.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id as string)}
            >
              Conversation {conv.id}
            </button>
          ))}
        </div>
      </div>

      {selectedConversation ? (
        <div>
          <div>
            {messages.map((message) => (
              <div key={message.id}>
                <p>{message.sender.username}</p>
                <p>{message.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessageHandle}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div>Select a conversation to start chatting</div>
      )}
    </div>
  );
};

export default Home;
