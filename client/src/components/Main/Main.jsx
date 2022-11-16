/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GoogleAuth from '../Forms/GoogleAuth/GoogleAuth';
// import styles from './Main.module.css';

function Main() {
  const user = useSelector((store) => store.user);

  return (
    <div>
      {user ? (
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text">
            Добро пожаловать
            {' '}
            {user.userName}
            {' '}
            в лучший VPN сервис
          </h1>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div>
            <img className="rounded-circle" src="https://img.freepik.com/premium-vector/vpn-icon-with-shield-vector_116137-3682.jpg?w=360" />
            <div className="d-flex justify-content-center mt-3"><h3 className="text">VPN MORDA</h3></div>
            <div className="row">
              <button className="btn" type="button">
                <NavLink
                  to="/auth/signin"
                  className="nav-link"
                >
                  Вход
                </NavLink>
              </button>
              <button className="btn" type="button">
                <NavLink
                  to="/auth/signUp"
                  className="nav-link"
                >
                  Регистрация
                </NavLink>
              </button>
            </div>
            <p className="divider" />
            <div>
              <div className="top">
                <GoogleAuth />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

export default Main;
