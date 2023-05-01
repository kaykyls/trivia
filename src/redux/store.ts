import { createStore } from 'redux';
import triviaReducer from './reducer';

const store = createStore(triviaReducer);

export default store;