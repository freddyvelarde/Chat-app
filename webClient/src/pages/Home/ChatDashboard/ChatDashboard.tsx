import { ChatDashboardStyles } from "./styles/ChatDashboardStyles";
import Conversations from "./Conversations";
import NewChat from "./NewChat";

const ChatDashboard = () => {
  return (
    <ChatDashboardStyles>
      <h1>Messenger</h1>
      <NewChat />
      <Conversations />
    </ChatDashboardStyles>
  );
};
export default ChatDashboard;
