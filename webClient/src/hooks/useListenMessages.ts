import { useEffect } from "react";
import { useSocket } from "./useSocket";
import useNewMessage from "./useNewMessage";

const useListenMessages = () => {
  const { socketRef } = useSocket();
  const { handleNewMessage } = useNewMessage();

  useEffect(() => {
    if (!socketRef) {
      console.log("socket error");
      return;
    }
    console.log("Listening for new messages...");

    socketRef.current?.on("newMessage", (newMessage) => {
      console.log("Notification (new message): ", newMessage);
      handleNewMessage(newMessage);
    });

    return () => {
      socketRef.current?.off("newMessage");
    };
  }, [socketRef]);
};

export default useListenMessages;
