import { ADD_ALL_ACCS, GET_ALL_ACCS } from '../types/accountTypes';

/* eslint-disable default-param-last */
const allAccsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_ALL_ACCS:
    return payload;
  case ADD_ALL_ACCS:
    return [...state, payload];
  default:
    return state;
  }
};

export default allAccsReducer;
