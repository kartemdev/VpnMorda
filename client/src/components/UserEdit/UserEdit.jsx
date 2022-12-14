/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { disableLoader, enableLoader } from '../../redux/actions/loaderAction';
import Loader from '../Loader/Loader';
import * as endPoints from '../../config/endPoints';
import { editUser } from '../../redux/actions/userAction';

function UserEdit() {
  const [userEdit, setUserEdit] = useState({
    email: '',
    userName: '',
    password: '',
    status: '',
  });

  const loader = useSelector((state) => state.loader);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableLoader());
    fetch(endPoints.getUser(user.id), { credentials: 'include' })
      .then((response) => response.json())
      .then((userData) => setUserEdit((prev) => ({
        ...prev,
        email: userData.email,
        userName: userData.userName,
        status: userData.status,
      })))
      .finally(() => {
        dispatch(disableLoader());
      });
  }, []);

  const changeHandler = (e) => {
    setUserEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.entries(userEdit);
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(editUser(payload, navigate));
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={submitHandler}
        className="userEdit d-flex flex-column align-items-center"
      >
        <legend className="text text-center mb-4">User Edit</legend>
        <div className="mb-3">
          <label htmlFor="userEditInput0" className="formLabel">Электронная почта:</label>
          <input
            onChange={changeHandler}
            id="userEditInput0"
            className="formControlEdit"
            value={userEdit.email}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userEditInput1" className="formLabel">Имя пользователя:</label>
          <input
            onChange={changeHandler}
            id="userEditInput1"
            className="formControlEdit"
            value={userEdit.userName}
            type="text"
            name="userName"
            placeholder="Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userEditInput2" className="formLabel">Пароль:</label>

          <input
            onChange={changeHandler}
            id="userEditInput2"
            className="formControlEdit"
            value={userEdit.password}
            type="text"
            name="password"
            placeholder="Pass"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary ms-1">
            Изменить
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;
