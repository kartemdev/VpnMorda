/* eslint-disable default-param-last */
import { GET_ALL_USERS } from '../types/userTypes';

const allUsersReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_ALL_USERS:
    return payload;
  default:
    return state;
  }
};
export default allUsersReducer;
