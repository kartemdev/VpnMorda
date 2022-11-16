/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAccs from '../UserAccs/UserAccs';
import UserList from './UserList/UserList';

function PersonalAreaAdmin() {
  const user = useSelector((store) => store.user);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center">

        <div className="card mb-3" id="myCard" style={{ width: '18rem' }}>
          <div className="adminForm card-body d-flex flex-column align-items-center">
            <h5 className="text card-title">{user.userName}</h5>
            <div className="text card-text">
              Email:
              {' '}
              {user.email}
            </div>
            <Link to="/myuser"><button type="button" className="btn btn-primary mt-2">Изменить</button></Link>
          </div>
        </div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="allUser accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Учетные записи всех пользователей
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div className="mb-3"><UserList /></div>
            </div>
          </div>
        </div>
      </div>
      <UserAccs />
    </div>
  );
}

export default PersonalAreaAdmin;
