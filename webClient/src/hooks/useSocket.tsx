import { useEffect } from "react";
import { io } from "socket.io-client";

// const socket = io("http://localhost:3001"); // Replace with your server's URL

const socket = io("http://localhost:3001", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
export const useSocket = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("messageReceived", (data) => {
      console.log("Message received:", data);
      // console.log("React Log: ", { message, conversationId });
      // Update your state or UI with the new message
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessageRealTime = (message: string, conversationId: string) => {
    console.log("React Log: ", { message, conversationId });
    socket.emit("newMessage", { message, conversationId });
  };

  return { sendMessageRealTime };
};
