import axios from 'axios';
import * as endPoints from '../../../config/endPoints';
import { addAllAccsAC, getAllAccsAC } from './allAccsActions';

axios.defaults.withCredentials = true;

export const getAllAccsThunk = () => (dispatch) => {
  axios.get(endPoints.getUserAllAcc())
    .then((response) => dispatch(getAllAccsAC(response.data)));
};

export const addAllAccsThunk = (body) => (dispatch) => {
  axios.post(endPoints.newAcc(), body)
    .then((response) => dispatch(addAllAccsAC(response.data)));
};

export const editAllAccsThunk = (id, payload, navigate) => (dispatch) => {
  axios.patch(endPoints.editAllAcc(id), payload)
    .then(() => dispatch(getAllAccsThunk()));
  navigate('/personalarea');
};

export const deleteAllAccsThunk = (id) => (dispatch) => {
  axios.delete(endPoints.editAllAcc(id))
    .then(() => dispatch(getAllAccsThunk()));
};
