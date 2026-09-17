import { AuthStatus, Paths } from '../../api/const';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../api/store/hooks';
import { useLogout } from '../../api/hooks/useLogout';
import { getAuthStatus, getUserEmail } from '../../api/store/slices/user/selectors';
import { getFavoritesCount } from '../../api/store/slices/favorites/selectors';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const authStatus = useAppSelector(getAuthStatus);
  const count = useAppSelector(getFavoritesCount);
  const email = useAppSelector(getUserEmail);

  const handleLogout = () => {
    logout();

    if (location.pathname === '/favorites') {
      navigate(Paths.Main);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={Paths.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" data-testid="header-logo"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authStatus !== AuthStatus.Auth
                  ?
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" data-testid="header-login" to={Paths.Login}>
                      <span className="header__login" >Sign in</span>
                    </Link>
                  </li>
                  :
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={Paths.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper" data-testid="header-avatar">
                        </div>
                        <span className="header__user-name user__name">{email}</span>
                        <span className="header__favorite-count">{count}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" onClick={handleLogout} data-testid="header-logout">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
