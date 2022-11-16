/* eslint-disable default-param-last */
import { USER_DATA } from '../types/userTypes';

const googleAuthReducer = (state = {}, action) => {
  switch (action.type) {
  case USER_DATA:
    return action.payload;

  default:
    return state;
  }
};

export default googleAuthReducer;
