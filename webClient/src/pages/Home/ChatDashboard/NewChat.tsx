import { ChangeEvent, SyntheticEvent, useState } from "react";
import { createConversation, searchUser } from "../../../config/endpoints";
import { IUser } from "../../../interfaces/user";
import useAuth from "../../../hooks/useAuth";
import useConversationId from "../../../hooks/useConversationId";
import {
  CloseBtn,
  InputStyles,
  NewChatStyles,
  UsersCard,
} from "./styles/NewChatStyles";

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
  const close = () => {
    setUsers([]);
    setQuery("");
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
  const handlerOnSubmit = (e: SyntheticEvent<HTMLFormElement>) =>
    e.preventDefault();

  // useEffect(() => {
  //   fetchAllUsers();
  // }, [token]);

  return (
    <NewChatStyles>
      <form onSubmit={handlerOnSubmit}>
        <InputStyles
          value={query}
          type="text"
          placeholder="search user"
          onChange={handleOnChange}
        />
      </form>

      {users && users.length > 0 ? (
        <UsersCard>
          <CloseBtn onClick={close}>X</CloseBtn>
          {users.map((user, index) => (
            <div key={index} className="card">
              <span
                onClick={() => {
                  createNewConversation(user.username);
                  close();
                }}
              >
                @{user.username} <span>&#8690;</span>
              </span>
            </div>
          ))}
        </UsersCard>
      ) : null}
    </NewChatStyles>
  );
};
export default NewChat;
