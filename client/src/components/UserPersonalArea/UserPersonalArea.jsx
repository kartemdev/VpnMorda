/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAccs from '../UserAccs/UserAccs';

function UserPersonalArea() {
  const user = useSelector((store) => store.user);

  return (
    <div className="d-flex flex-column align-items-center">
      <label htmlFor="myCard" className="text-danger fs-4">Моя учетная запись:</label>
      <div className="userAcc card mb-3" id="myCard" style={{ width: '18rem' }}>
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title">{user.userName}</h5>
          <div className="card-text">
            Email:
            {' '}
            {user.email}
          </div>
          <Link to="/myuser"><button type="button" className="btn btn-primary mt-2">Изменить</button></Link>
        </div>
      </div>
      <UserAccs />
    </div>
  );
}

export default UserPersonalArea;
