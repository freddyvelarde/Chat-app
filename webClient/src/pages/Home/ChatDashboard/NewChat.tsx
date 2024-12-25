import { useEffect, useState } from "react";
import { allUsers } from "../../../config/endpoints";
import { IUser } from "../../../interfaces/user";
import useAuth from "../../../hooks/useAuth";

const NewChat = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { token } = useAuth();

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
            <h2>{user.username}</h2>
          </div>
        ))
      ) : (
        <span>No users yet</span>
      )}
    </>
  );
};
export default NewChat;
