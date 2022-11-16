import { ADD_ALL_ACCS, GET_ALL_ACCS } from '../../types/accountTypes';

export const getAllAccsAC = (payload) => ({ type: GET_ALL_ACCS, payload });
export const addAllAccsAC = (payload) => ({ type: ADD_ALL_ACCS, payload });
