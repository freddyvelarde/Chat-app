import { useEffect } from "react";
import { useSocket } from "./useSocket";
import useNewMessage from "./useNewMessage";
import audio from "../assets/music.wav";

const useListenMessages = () => {
  const { socketRef } = useSocket();
  const { handleNewMessage } = useNewMessage();
  const playAudio = async () => {
    // const player = new AdvancedAudioPlayer(audio);
    const sound = new Audio(audio);
    sound.play();
  };

  useEffect(() => {
    if (!socketRef) {
      console.log("socket error");
      return;
    }
    // console.log("Listening for new messages...");

    socketRef.current?.on("newMessage", (newMessage) => {
      // console.log("Notification (new message): ", newMessage);
      handleNewMessage(newMessage);
      playAudio();
    });

    return () => {
      socketRef.current?.off("newMessage");
    };
  }, [socketRef]);
};

export default useListenMessages;
