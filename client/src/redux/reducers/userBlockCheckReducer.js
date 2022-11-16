import { GET_USER_BLKCHECK, SET_USER_BLKCHECK } from '../types/blockCheckTypes';

const userblockCheckReducer = (state = true, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_USER_BLKCHECK:
    return payload;
  case SET_USER_BLKCHECK:
    return payload;
  default:
    return state;
  }
};

export default userblockCheckReducer;
