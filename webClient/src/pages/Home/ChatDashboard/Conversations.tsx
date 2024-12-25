import { useEffect, useState } from "react";
import {
  allConversationsByUser,
  deleteConversation,
} from "../../../config/endpoints";
import useAuth from "../../../hooks/useAuth";
import { IUser } from "../../../interfaces/user";
import useConversationId from "../../../hooks/useConversationId";
interface Conversation {
  id: string;
  createdAt?: Date;
  user?: IUser;
  conversationId: string;
}

const Conversations = () => {
  const { token } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>();
  const { setConversationId } = useConversationId();

  const fetchDeleteConversation = async (conversationId: string) => {
    await fetch(`${deleteConversation}/${conversationId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchAllConversations = async () => {
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

      const res = await req.json();
      setConversations(res);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchAllConversations();
  }, [token]);

  return (
    <>
      <div>
        <button onClick={() => console.log(conversations)}>
          {" "}
          get all conv
        </button>
        {conversations && conversations?.length > 0 ? (
          conversations?.map((conv, index) => (
            <div key={index}>
              <hr />
              <li
                onClick={() => {
                  setConversationId(conv.conversationId);
                }}
              >
                {conv.user?.username}
              </li>
              <button
                onClick={() => fetchDeleteConversation(conv.conversationId)}
              >
                delete conversation
              </button>
            </div>
          ))
        ) : (
          <span>No conversation yet</span>
        )}
      </div>
    </>
  );
};
export default Conversations;
