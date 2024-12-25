import { useEffect, useState } from "react";
import { allUsers, createConversation } from "../../../config/endpoints";
import { IUser } from "../../../interfaces/user";
import useAuth from "../../../hooks/useAuth";
import useConversationId from "../../../hooks/useConversationId";

interface CreateResponse {
  id: string;
}
const NewChat = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { token } = useAuth();

  const { setConversationId } = useConversationId();
  const createNewConversation = async (username: string) => {
    const req = await fetch(`${createConversation}/${username}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res: CreateResponse = await req.json();
    setConversationId(res.id);
  };

  const fetchAllUsers = async () => {
    const req = await fetch(allUsers, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    setUsers(res);
  };
  useEffect(() => {
    fetchAllUsers();
  }, [token]);

  return (
    <>
      <h1>New chat +</h1>
      {users && users.length > 0 ? (
        users.map((user, index) => (
          <div key={index}>
            <span onClick={() => createNewConversation(user.username)}>
              {user.username}
            </span>
          </div>
        ))
      ) : (
        <span>No users yet</span>
      )}
    </>
  );
};
export default NewChat;
