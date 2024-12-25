import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setConversationIdValue } from "../redux/slices/conversationId";

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
