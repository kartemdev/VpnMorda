import { GET_ALL_USERS } from '../../types/userTypes';

const getAllUserAC = (payload) => ({ type: GET_ALL_USERS, payload });

export default getAllUserAC;
