import { Link, useNavigate } from 'react-router-dom';
import { AuthStatus, Cities, Paths } from '../../shared/api/const';
import { useAppDispatch, useAppSelector } from '../../shared/api/store/hooks';
import { useRef, FormEvent} from 'react';
import { fetchFavoriteOffers, login } from '../../shared/api/store/api-action';
import { getAuthStatus } from '../../shared/api/store/slices/user/selectors';
import { changeCity } from '../../shared/api/store/slices/offers/offers-slice';

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const currentCity: string = Cities[Math.floor(Math.random() * (Cities.length))];

  if (authStatus === AuthStatus.Auth) {
    navigate(Paths.Main);
  }

  const handleMoveToCurrentCity = () => {
    dispatch(changeCity(currentCity));
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(
        login({
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
      ).unwrap().then(() => {
        dispatch(fetchFavoriteOffers());
        navigate(Paths.Main);
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={Paths.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action=''
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link onClick={handleMoveToCurrentCity} className="locations__item-link" to={Paths.Main}>
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
