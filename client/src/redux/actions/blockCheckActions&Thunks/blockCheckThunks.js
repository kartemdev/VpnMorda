import axios from 'axios';
import * as endPoints from '../../../config/endPoints';
import {
  getAccBlkCheckAC, getUserBlkCheckAC, setAccBlkCheckAC, setUserBlkCheckAC
} from './blockCheckActions';

axios.defaults.withCredentials = true;

export const getUserBlkCheckThunk = (id) => (dispatch) => {
  axios.get(endPoints.getUser(id))
    .then((response) => {
      const { status } = response.data;
      dispatch(getUserBlkCheckAC(status));
    });
};

export const setUserBlkCheckThunk = (id, updatedFields) => (dispatch) => {
  axios.patch(endPoints.blockUser(id), updatedFields)
    .then((response) => {
      const { status } = response.data;
      dispatch(setUserBlkCheckAC(status));
    });
};

export const getAccBlkCheckThunk = (id) => (dispatch) => {
  axios.get(endPoints.getOneAcc(id))
    .then((response) => {
      const { status } = response.data;
      dispatch(getAccBlkCheckAC(status));
    });
};

export const setAccBlkCheckThunk = (id, updatedFields) => (dispatch) => {
  axios.patch(endPoints.getOneAcc(id), updatedFields)
    .then((response) => {
      const { status } = response.data;
      dispatch(setAccBlkCheckAC(status));
    });
};
