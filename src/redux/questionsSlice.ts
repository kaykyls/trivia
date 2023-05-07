import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    currentQuestion: 0,
    categoryId: null
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
    },

    updateCategoryId: (state, { payload }) => {
      state.categoryId = payload;
    }
  },
});

export const { setQuestions, resetQuestions, updateQuestion, updateCategoryId } = questionsSlice.actions;

export default questionsSlice.reducer;