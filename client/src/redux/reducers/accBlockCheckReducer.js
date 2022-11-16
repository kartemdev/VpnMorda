const { GET_ACC_BLKCHECK, SET_ACC_BLKCHECK } = require('../types/blockCheckTypes');

const accBlockCheckReducer = (state = true, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_ACC_BLKCHECK:
    return payload;
  case SET_ACC_BLKCHECK:
    return payload;
  default:
    return state;
  }
};

export default accBlockCheckReducer;
