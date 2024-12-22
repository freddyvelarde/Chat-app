import { createSlice } from "@reduxjs/toolkit";

const dataStored = localStorage.getItem("auth");
const dataParsed = dataStored ? JSON.parse(dataStored) : null;

interface InitialState {
  value: {
    isAuth: boolean;
    token: string;
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      isAuth: dataParsed != null ? dataParsed.isAuth : false,
      token: dataParsed != null ? dataParsed.token : "",
    },
  } as InitialState,
  reducers: {
    setAuthValue: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setAuthValue } = authSlice.actions;
export default authSlice.reducer;
