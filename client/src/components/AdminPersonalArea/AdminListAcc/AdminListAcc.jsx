/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as endPoints from '../../../config/endPoints';
import { deleteAllAccsThunk } from '../../../redux/actions/allAccsActions&Thunks/allAccsThunks';

function AdminListAcc() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(endPoints.getAllAccAdm(id), { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error(error));
  }, []);

  const deleteHandler = (curId) => {
    dispatch(deleteAllAccsThunk(curId));
    setList((prev) => prev.filter((el) => +el.id !== +curId));
  };

  if (list.length === 0) return <p>ПУСТО</p>;
  return (
    <div className="d-flex justify-content-center">
      <div className="list-group">
        {list.map((acc) => (
          <div className="list-group-item mt-1" key={acc.id}>
            Логин:
            {' '}
            <strong>{acc.ac_name}</strong>
            {' '}
            , Пароль:
            {' '}
            <strong>**********</strong>
            <Link to={`/accs/${acc.id}`}><button className="btn btn-primary ms-2" type="button">изменить</button></Link>
            <button onClick={() => deleteHandler(acc.id)} className="btn btn-danger ms-2" type="button">удалить</button>
          </div>
        )).reverse()}
      </div>
    </div>
  );
}

export default AdminListAcc;
