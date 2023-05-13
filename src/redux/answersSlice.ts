import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
  name: "answers",
  initialState: {
    answers: [],
    selectedAnswers: [],
    correctAnswers: [],
    isCorrect: []
  },
  reducers: {
    setSelectedAnswers: (state: any, { payload }) => {
      const { index, answer } = payload;
      state.selectedAnswers[index] = answer;
    },

    setCorrectAnswers: (state: any, { payload }) => {
      const { index, correctAnswer } = payload;
      state.correctAnswers[index] = correctAnswer;
    },

    setIsCorrect: (state: any, { payload }) => {
      const { index, isCorrect } = payload;
      state.isCorrect[index] = isCorrect;
    },

    resetAnswer: (state) => {
      state.selectedAnswers = [];
      state.correctAnswers = [];
      state.isCorrect = [];
    },

    setAnswers: (state, { payload }) => {
      state.answers = payload;
    }
  },
});

export const { setSelectedAnswers, setCorrectAnswers, setIsCorrect, resetAnswer, setAnswers } = answersSlice.actions;

export default answersSlice.reducer;
