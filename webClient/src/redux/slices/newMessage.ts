import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../interfaces/messages";

interface InitialState {
  value: IMessage;
}

export const newMessageSlice = createSlice({
  name: "newMessage",
  initialState: {
    value: {
      content: "",
      conversationId: "",
    },
  } as InitialState,
  reducers: {
    setNewMessage: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setNewMessage } = newMessageSlice.actions;
export default newMessageSlice.reducer;
