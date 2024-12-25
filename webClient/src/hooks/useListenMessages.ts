import { useEffect } from "react";
import { useSocket } from "./useSocket";

const useListenMessages = () => {
  const { socketRef } = useSocket();
  // const [onlineUsers, setOnlineUsers] = useState<string[]>();

  useEffect(() => {
    if (!socketRef) {
      console.log("socket error");
      return;
    }
    console.log("Listening for new messages...");

    socketRef.current?.on("newMessage", (newMessage) => {
      console.log("Notification (new message): ", newMessage);
    });

    return () => {
      socketRef.current?.off("newMessage");
    };
  }, [socketRef]);
};

export default useListenMessages;
