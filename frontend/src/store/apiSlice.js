import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiSlice = createSlice({
  name: "api",
  initialState: {},
  reducers: {
    onRequestStart: (state, action) => {
      console.log("request start");
    },
    onRequestOk: (state, action) => {
      console.log("request OK:", action.payload);
    },
    onRequestBad: (state, action) => {
      console.log("request BAD:", action.payload);
    },
  },
});

export const { onRequestStart, onRequestOk, onRequestBad } = apiSlice.actions;

export function APIrequest({
  method,
  apiEndpoint,
  options,
  callback = undefined,
}) {
  return async function (dispatch) {
    try {
      dispatch(onRequestStart());

      const response = await axios({
        method,
        url: apiEndpoint,
        ...options,
        data: options?.data,
      });

      dispatch(onRequestOk(response.data));

      // Call each callback function in the array
      if (callback) {
        callback(response.data, true);
      }
    } catch (error) {
      dispatch(onRequestBad(error));

      // Call each callback function in the array with an error parameter
      if (callback) {
        callback(error, false);
      }
    }
  };
}

export default apiSlice.reducer;
