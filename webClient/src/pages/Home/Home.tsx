import { useEffect, useState } from "react";
import { allConversationsByUser } from "../../config/endpoints";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

// Define an interface for your conversation type
interface Conversation {
  id: string;
  // Add other properties your conversation has
}

function Home() {
  const [response, setResponse] = useState<Conversation[]>();
  const { token } = useAuth();

  const getAllConversationByUser = async () => {
    const req = await fetch(allConversationsByUser, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    setResponse(res);
  };

  useEffect(() => {
    getAllConversationByUser();
  }, [token]); // Add token as dependency

  return (
    <>
      <h1>All conversations</h1>
      <button onClick={getAllConversationByUser}>get all conv</button>
      {response?.map((elem) => (
        <>
          <Link key={elem.id} to={`/chat/${elem.id}`}>
            {elem.id}
          </Link>
          <br />
        </>
      ))}
    </>
  );
}

export default Home;
