import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: []
  },
  reducers: {
    setQuestions: (state, { payload }) => {
        state.questions = payload;
    },

    resetQuestions: (state) => {
        state.questions = [];
    }
  },
});

export const { setQuestions, resetQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;