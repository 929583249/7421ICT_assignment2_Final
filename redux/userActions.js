import { SET_USER_TOKEN } from './actionTypes';

export const setUserToken = (token) => ({
    
  type: SET_USER_TOKEN,
  payload: token
});
export const setUserDetails = (details) => ({
  type: 'SET_USER_DETAILS',
  payload: details
});
