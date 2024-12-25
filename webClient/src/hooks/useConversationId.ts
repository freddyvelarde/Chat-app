import { useDispatch, useSelector } from "react-redux";
import { setConversationIdValue } from "../redux/slices/conversationId";
import { RootState } from "../redux/store";

const useConversationId = () => {
  const conversationId = useSelector(
    (state: RootState) => state.conversationId.value,
  );
  const dispatch = useDispatch();

  const setConversationId = (conversationId: string) => {
    dispatch(setConversationIdValue(conversationId));
  };

  return { conversationId, setConversationId };
};

export default useConversationId;
