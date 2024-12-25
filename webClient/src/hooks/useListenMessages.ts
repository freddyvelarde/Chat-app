import { useEffect } from "react";
import { useSocket } from "./useSocket";

const useListenMessages = () => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    console.log("Listening for new messages...");
    socket.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      console.log("Notification (new message): ", newMessage);
    });

    // Cleanup listener on unmount or socket change
    return () => {
      socket.off("newMessage");
    };
  }, [socket]); // Dependency on socket, but it should now be stable
};

export default useListenMessages;
