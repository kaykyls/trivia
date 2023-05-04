import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './scoreSlice'
import questionsReducer from './questionsSlice'

const store = configureStore({
  reducer: {
    score: scoreReducer,
    questions: questionsReducer
  },
})

export default store