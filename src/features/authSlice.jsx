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
    registerSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.data.username;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.token = "";
      state.username = "";
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    addFirmSuccess: (state, action) => {
      state.token = "";
      state.firms = [...state.firms, action.payload];
      state.loading = false;
    },
    firmListSuccess: (state, action) => {
      state.firms = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
  addFirmSuccess,
  firmListSuccess,
} = authSlice.actions;
export default authSlice.reducer;
