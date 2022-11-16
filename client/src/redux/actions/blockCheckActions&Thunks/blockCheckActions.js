import {
  GET_ACC_BLKCHECK, GET_USER_BLKCHECK, SET_ACC_BLKCHECK, SET_USER_BLKCHECK
} from '../../types/blockCheckTypes';

export const getUserBlkCheckAC = (payload) => ({ type: GET_USER_BLKCHECK, payload });
export const setUserBlkCheckAC = (payload) => ({ type: SET_USER_BLKCHECK, payload });

export const getAccBlkCheckAC = (payload) => ({ type: GET_ACC_BLKCHECK, payload });
export const setAccBlkCheckAC = (payload) => ({ type: SET_ACC_BLKCHECK, payload });
