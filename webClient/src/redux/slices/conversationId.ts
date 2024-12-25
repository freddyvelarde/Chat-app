import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  value: string;
}

export const conversationIdSlice = createSlice({
  name: "conversationId",
  initialState: {
    value: "",
  } as InitialState,
  reducers: {
    setConversationIdValue: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setConversationIdValue } = conversationIdSlice.actions;
export default conversationIdSlice.reducer;
