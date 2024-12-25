import { IMessage } from "../interfaces/messages";
import { setNewMessage } from "../redux/slices/newMessage";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

const useNewMessage = () => {
  const newMessage = useSelector((state: RootState) => state.newMessage.value);
  const dispatch = useDispatch();

  const handleNewMessage = (newMessage: IMessage) => {
    dispatch(setNewMessage(newMessage));
  };

  return {
    handleNewMessage,
    newMessage,
  };
};

export default useNewMessage;
