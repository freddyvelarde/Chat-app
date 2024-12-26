import useListenMessages from "../../hooks/useListenMessages";
import Chat from "./Chat/Chat";
import ChatDashboard from "./ChatDashboard/ChatDashboard";
import { HomeStyles } from "./HomeStyles";
const Home = () => {
  useListenMessages();

  return (
    <HomeStyles>
      <ChatDashboard />
      <Chat />
    </HomeStyles>
  );
};

export default Home;
