import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    content: "",
    isOn: false,
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload.content;
      state.isOn = action.payload.isOn;
    },
  },
});

export const { setContent } = modalSlice.actions;

export default modalSlice.reducer;
