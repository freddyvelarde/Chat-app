import { ChangeEvent, useState } from "react";
import { createConversation, searchUser } from "../../../config/endpoints";
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

  const [query, setQuery] = useState<string>("");
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchUserQuery(e.target.value);
    setQuery(e.target.value);
  };

  const searchUserQuery = async (username: string) => {
    const req = await fetch(`${searchUser}/${username}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    setUsers(res);
  };
  // useEffect(() => {
  //   fetchAllUsers();
  // }, [token]);

  return (
    <>
      <h1>New chat +</h1>

      <form>
        <input
          value={query}
          type="text"
          placeholder="search user"
          onChange={handleOnChange}
        />
      </form>

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
