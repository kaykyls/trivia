import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './scoreSlice'
import questionsReducer from './questionsSlice'
import answerReducer from './answerSlice'
import gameReducer from './gameSlice'

const store = configureStore({
  reducer: {
    score: scoreReducer,
    questions: questionsReducer,
    answer: answerReducer,
    game: gameReducer,
  },
})

export default store