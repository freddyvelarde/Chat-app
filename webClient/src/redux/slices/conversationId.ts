import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  value: string;
  // value: {
  //   id: string;
  // };
}

export const conversationIdSlice = createSlice({
  name: "auth",
  initialState: {
    value: "",
    // value: {
    //   id: "",
    // },
  } as InitialState,
  reducers: {
    setConversationIdValue: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setConversationIdValue } = conversationIdSlice.actions;
export default conversationIdSlice.reducer;
