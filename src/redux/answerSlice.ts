import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    selectedAnswer: null,
    playerAnswer: "",
    correctAnswer: "",
    isCorrect: false
  },
  reducers: {
    setSelectedAnswer: (state, { payload }) => {
        state.selectedAnswer = payload;
    },

    setPlayerAnswer: (state, { payload }) => {
        state.playerAnswer = payload;
    },

    setCorrectAnswer: (state, { payload }) => {
        state.correctAnswer = payload;
    },

    setIsCorrect: (state, { payload }) => {
        state.isCorrect = payload;
    },

    resetAnswer: (state) => {
        state.selectedAnswer = null;
        state.playerAnswer = "";
        state.correctAnswer = "";
        state.isCorrect = false;
    }
  },
});

export const { setSelectedAnswer, setPlayerAnswer, setCorrectAnswer, setIsCorrect, resetAnswer } = answerSlice.actions;

export default answerSlice.reducer;