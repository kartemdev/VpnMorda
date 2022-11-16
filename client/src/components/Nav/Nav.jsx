import React, { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Nav({ switchTheme, theme }) {
  const user = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark">
      <div className="container">
        <div className="container-fluid d-flex justify-content-between">
          <Link className={`navbar-brand-${theme}`} to="/">
            VPN Morda
          </Link>
          <div className=" navbar-collapse ms-10" id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/auth/signout"
                      className={`nav-link-${theme}`}
                    >
                      Выход
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/personalarea"
                      className={`nav-link-${theme}`}
                    >
                      Личный кабинет
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink to="/" className={`nav-link-${theme}`}>
                    Документация
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="theme">
            <button type="button" onClick={switchTheme} className="switchTheme">тема</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
