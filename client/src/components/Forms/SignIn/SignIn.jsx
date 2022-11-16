import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../redux/actions/userAction';

function SignIn() {
  const [userSignIn, setUserSignIn] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const from = { pathname: '/' };

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(userSignIn, navigate, from));
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={submitHandler}
        className="signForm"
      >
        <legend className="text text-center mb-4">User Sign In</legend>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            value={userSignIn.email}
            className="formControl"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={changeHandler}
            value={userSignIn.password}
            className="formControl"
            type="password"
            name="password"
            placeholder="Pass"
          />
        </div>

        <button type="submit" className="btn">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
