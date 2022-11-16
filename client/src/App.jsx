import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import UserEdit from './components/UserEdit/UserEdit';
import SignOut from './components/Forms/SignOut/SignOut';
import Nav from './components/Nav/Nav';
import SignUp from './components/Forms/SignUp/SignUp';
import SignIn from './components/Forms/SignIn/SignIn';
import Main from './components/Main/Main';
import AdminPersonalArearea from './components/AdminPersonalArea/AdminPersonalArea';
import AdminUserEdit from './components/AdminPersonalArea/AdminEditUser/AdminUserEdit';
import { checkAuth } from './redux/actions/userAction';
import AdminListAcc from './components/AdminPersonalArea/AdminListAcc/AdminListAcc';
import UserPersonalArea from './components/UserPersonalArea/UserPersonalArea';
import AccsEdit from './components/AccsEdit/AccsEdit';

function App() {
  const adminStatus = useSelector((store) => store.user?.adm);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  // eslint-disable-next-line no-constant-condition
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div data-theme={theme} className="wrapper">
      <Nav switchTheme={switchTheme} theme={theme} />
      <div className="container py-5">
        <Routes>
          <Route path="/" element={<Main />} />
          {adminStatus ? (
            <Route path="/personalarea">
              <Route index element={<PrivateRoute><AdminPersonalArearea /></PrivateRoute>} />
              <Route path="user/:id" element={<PrivateRoute><AdminUserEdit /></PrivateRoute>} />
              <Route path="admaccs/:id" element={<PrivateRoute><AdminListAcc /></PrivateRoute>} />
            </Route>
          ) : <Route path="/personalarea" element={<PrivateRoute><UserPersonalArea /></PrivateRoute>} />}

          <Route path="/accs/:id" element={<PrivateRoute><AccsEdit /></PrivateRoute>} />
          <Route path="/myuser" element={<PrivateRoute><UserEdit /></PrivateRoute>} />
          <Route path="/auth/signout" element={<PrivateRoute><SignOut /></PrivateRoute>} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
