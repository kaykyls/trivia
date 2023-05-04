import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    currentQuestion: 0
  },
  reducers: {
    setQuestions: (state, { payload }) => {
        state.questions = payload;
    },

    resetQuestions: (state) => {
        state.questions = [];
    },

    updateQuestion: (state) => {
        state.currentQuestion += 1;
    }
  },
});

export const { setQuestions, resetQuestions, updateQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;