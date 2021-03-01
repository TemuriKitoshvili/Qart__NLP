import { actionTypes } from './actionTypes';

export const initialState = {
  user: null,
  projects: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default reducer;
