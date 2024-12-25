import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import useAuth from "./useAuth";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:3001", {
        query: {
          userId: user.id, // Send userId as part of the query
        },
      });

      socketRef.current = socket;

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        console.log("error conenectiong to socket!");
      }
    }
  }, [user]);
  const socket = socketRef.current;

  return { socket, socketRef };
};
