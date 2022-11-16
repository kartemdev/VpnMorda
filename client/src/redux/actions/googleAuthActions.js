import { setUser } from './userAction';

export const getGoogleDataThunk = (data) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_HOST}/auth/googleAuth`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ data }),
  });
  const userGoogle = await response.json();
  dispatch(setUser(userGoogle));
};

export const just = () => {

};
