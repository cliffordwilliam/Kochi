import { configureStore } from "@reduxjs/toolkit";
// slices
import apiSlice from "./apiSlice";
import modalSlice from "./modalSlice";
import curtainSlice from "./curtainSlice";

export const store = configureStore({
  reducer: {
    api: apiSlice,
    curtain: curtainSlice,
    modal: modalSlice,
  },
});
