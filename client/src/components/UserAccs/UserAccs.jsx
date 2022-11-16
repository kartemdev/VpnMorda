/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addAllAccsThunk, deleteAllAccsThunk, getAllAccsThunk } from '../../redux/actions/allAccsActions&Thunks/allAccsThunks';

function UserAccs() {
  const [input, setInput] = useState({
    acname: '',
    pass: '',
  });

  const list = useSelector((store) => store.allAccs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccsThunk());
  }, []);

  const deleteHandler = (id) => {
    dispatch(deleteAllAccsThunk(id));
  };

  const changeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addAllAccsThunk(input));
  };

  return (
    <div className="d-flex flex-column">
      <div className="createAcc card">
        <form onSubmit={submitHandler} className="p-1 d-flex flex-column">
          <input type="text" onChange={changeHandler} name="acname" value={input.acname} placeholder="Логин" className="from-control" />
          <input type="password" onChange={changeHandler} name="pass" value={input.pass} placeholder="Пароль" className="from-control mt-1" />
          <button type="submit" className="btn btn-primary">Создать Аккаунт</button>
        </form>
      </div>
      <div className="mt-3">
        <label htmlFor="listAccs" className="text-danger fs-4">Мои аккаунты:</label>
        <div className="list-group" id="listAccs">
          {list?.map((acc) => (
            <div className="myAccText list-group-item mt-1" key={acc.id}>
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
    </div>
  );
}

export default UserAccs;
