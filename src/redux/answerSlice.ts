import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    selectedAnswer: null,
    correctAnswer: null,
    isCorrect: false
  },
  reducers: {
    setSelectedAnswer: (state, { payload }) => {
        state.selectedAnswer = payload;
    },

    setCorrectAnswer: (state, { payload }) => {
        state.correctAnswer = payload;
    },

    setIsCorrect: (state, { payload }) => {
        state.isCorrect = payload;
    },

    resetAnswer: (state) => {
        state.selectedAnswer = null;
        state.correctAnswer = null;
        state.isCorrect = false;
    }
  },
});

export const { setSelectedAnswer, setCorrectAnswer, setIsCorrect, resetAnswer } = answerSlice.actions;

export default answerSlice.reducer;