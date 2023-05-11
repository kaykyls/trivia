import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "answer",
  initialState: {
    isPlaying: false,
  },
  reducers: {
    setIsPlaying: (state, { payload }) => {
        state.isPlaying = payload;
    },
  },
});

export const { setIsPlaying } = gameSlice.actions;

export default gameSlice.reducer;