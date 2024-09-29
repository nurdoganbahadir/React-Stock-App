import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: "",
    username: "",
    loading: "",
    error: "",
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, loginSuccess, fetchFail } = authSlice.actions;
export default authSlice.reducer;
