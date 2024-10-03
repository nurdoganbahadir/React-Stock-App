import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: "",
  products: "",
  sales: "",
  purchases: "",
  brands: "",
  categories: "",
  loading: "",
  error: "",
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getStockSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.path] = payload.data;
    },
    postStockSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.path] = [...state[payload.path], payload.data];
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getStockSuccess, fetchFail, postStockSuccess } =
  stockSlice.actions;

export default stockSlice.reducer;
