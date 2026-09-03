import Header from '../../shared/components/Header/Header';
import { AuthStatus, Paths } from '../../shared/api/const';
import { useAppSelector } from '../../shared/api/store/hooks';
import { getFavoriteOffers } from '../../shared/api/store/selector';
import { Link } from 'react-router-dom';
import FavoriteLocationList from './components/FavoriteLocationsList';

const FavoritesEmptyPageTemplate = () => (
  <div className="page page--favorites-empty">
    <Header authStatus={AuthStatus.Auth} />
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
          </div>
        </section>
      </div>
    </main>
    <footer className="footer">
      <Link className="footer__logo-link" to={Paths.Main}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  </div>
);

const FavoritesPage = () => {
  const offers = useAppSelector(getFavoriteOffers);

  if (offers.size === 0) {
    return <FavoritesEmptyPageTemplate/>;
  }

  return (
    <div className="page">
      <Header authStatus={AuthStatus.Auth} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteLocationList favoriteOffers={offers}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
