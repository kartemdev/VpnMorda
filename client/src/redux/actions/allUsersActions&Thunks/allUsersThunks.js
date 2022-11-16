import axios from 'axios';
import * as endPoints from '../../../config/endPoints';
import getAllUserAC from './allUsersActions';

axios.defaults.withCredentials = true;

export const getAllUserThunk = () => (dispatch) => {
  axios.get(endPoints.getAllUsers())
    .then((response) => dispatch(getAllUserAC(response.data)));
};

export const editAllUserThunk = (id, payload, navigate) => (dispatch) => {
  axios.patch(endPoints.editAllUsers(id), payload)
    .then(() => dispatch(getAllUserThunk()));
  navigate('/personalarea');
};

export const deleteAllUserThunk = (id) => (dispatch) => {
  axios.delete(endPoints.editUser(id))
    .then(() => dispatch(getAllUserThunk()));
};
