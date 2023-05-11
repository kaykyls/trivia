import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, { payload }) => {
      state.value += payload;
    },
    resetScore: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;