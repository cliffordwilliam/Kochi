import { createSlice } from "@reduxjs/toolkit";

const curtainSlice = createSlice({
  name: "curtain",
  initialState: {
    targetPage: "",
  },
  reducers: {
    setTargetPage: (state, action) => {
      state.targetPage = action.payload;
    },
  },
});

export const { setTargetPage } = curtainSlice.actions;

export default curtainSlice.reducer;
