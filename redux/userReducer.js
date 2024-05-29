import { SET_USER_TOKEN, SET_USER_DETAILS } from './actionTypes';

const initialState = {
  token: null,
  name: '',
  email: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        email: action.payload.email
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        email: action.payload.email
      };
    default:
      return state;
  }
};

export default userReducer;
