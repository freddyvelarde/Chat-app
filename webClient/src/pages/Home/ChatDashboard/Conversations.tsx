import { useEffect, useState } from "react";
import {
  allConversationsByUser,
  deleteConversation,
} from "../../../config/endpoints";
import useAuth from "../../../hooks/useAuth";
import { IUser } from "../../../interfaces/user";
import useConversationId from "../../../hooks/useConversationId";
import { ConversationsStyles, TrashBtn } from "./styles/ConversationsStyles";
import useListenMessages from "../../../hooks/useListenMessages";
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
  const { usersOnline } = useListenMessages();

  const checkIfUserIsOnline = (userId: string): boolean => {
    const u = usersOnline.find((el) => el === userId);

    return u !== undefined;
  };

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
    <ConversationsStyles>
      {conversations && conversations?.length > 0 ? (
        conversations?.map((conv, index) => (
          <div className="conversation" key={index}>
            <hr />
            <li
              onClick={() => {
                setConversationId(conv.conversationId);
              }}
            >
              {conv.user?.username}{" "}
              {checkIfUserIsOnline(conv.user?.id as string) ? (
                <div className="online"></div>
              ) : null}
            </li>
            <TrashBtn
              onClick={() => fetchDeleteConversation(conv.conversationId)}
            >
              <span>&#128465;</span>
            </TrashBtn>
          </div>
        ))
      ) : (
        <span>No conversation yet</span>
      )}
    </ConversationsStyles>
  );
};
export default Conversations;
