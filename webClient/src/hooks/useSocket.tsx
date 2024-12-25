import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import useAuth from "./useAuth";

// const socketURL =
//   import.meta.env.MODE === "development" ? "http://localhost:3001" : "/";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Initialize the socket connection
      const socket = io("http://localhost:3001", {
        query: {
          userId: user.id, // Send userId as part of the query
        },
      });

      socketRef.current = socket;

      // Listen for online users
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.close();
        socketRef.current = null;
      };
    }
  }, [user]);

  return { socket: socketRef.current, onlineUsers };
};
