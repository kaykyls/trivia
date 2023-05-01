import { SET_CATEGORIES } from './actions';

const initialState = {
  categories: [],
};

function triviaReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    default:
      return state;
  }
}

export default triviaReducer;