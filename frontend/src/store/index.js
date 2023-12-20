import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
// slices

export const store = configureStore({
  reducer: {
    api: apiSlice,
  },
});
