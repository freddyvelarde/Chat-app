import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import conversationId from "./slices/conversationId";

export const store = configureStore({ reducer: { auth, conversationId } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
