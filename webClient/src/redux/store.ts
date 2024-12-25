import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import conversationId from "./slices/conversationId";
import newMessage from "./slices/newMessage";

export const store = configureStore({
  reducer: { auth, conversationId, newMessage },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
