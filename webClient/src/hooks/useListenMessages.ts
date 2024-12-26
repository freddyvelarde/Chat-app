import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";
import useNewMessage from "./useNewMessage";
import audio from "../assets/music.wav";

const useListenMessages = () => {
  const { socketRef } = useSocket();
  const { handleNewMessage } = useNewMessage();
  const [usersOnline, setUsersOnline] = useState<string[]>([]);

  const playAudio = async () => {
    const sound = new Audio(audio);
    sound.play().catch(() => {
      alert("New message received (audio unavailable)");
    });
  };

  useEffect(() => {
    if (!socketRef) {
      console.log("socket error");
      return;
    }

    socketRef.current?.on("newMessage", (newMessage) => {
      // console.log("Notification (new message): ", newMessage);
      handleNewMessage(newMessage);

      playAudio();
    });
    socketRef.current?.on("getOnlineUsers", (users: string[]) => {
      // console.log("users online", users);

      setUsersOnline(users);
      // console.log(usersOnline);
    });

    return () => {
      socketRef.current?.off("newMessage");
    };
  }, [socketRef]);
  return { usersOnline };
};

export default useListenMessages;
