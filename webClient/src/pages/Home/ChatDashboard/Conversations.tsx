import { useEffect, useState } from "react";
import { allConversationsByUser } from "../../../config/endpoints";
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
              <li
                onClick={() => {
                  setConversationId(conv.conversationId);
                }}
              >
                {conv.user?.username}
              </li>
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
