import { AuthStatus } from '../../shared/api/const.ts';
import { City, Offer } from '../../shared/api/models.ts';
import Header from '../../shared/components/Header/Header.tsx';
import EmptyOffersList from './components/EmptyOffersList.tsx';
import Map from '../../shared/components/Map/Map.tsx';
import { useState } from 'react';
import OffersList from './components/OffersList.tsx';

type MainPageProps = {
  offers?: Offer[];
}

const city: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 13,
  },
};

const MainPage = ({offers}: MainPageProps) => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleOfferHover = (id: string) => {
    const offer = offers?.find((item) => item.id === id);
    setSelectedOffer(offer || null);
  };

  return (
    <div className="page page--gray page--main">
      <Header authStatus={AuthStatus.Auth} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          {
            offers
              ?
              <OffersList offers={offers} handleOfferHover={handleOfferHover}>
                <Map offers={offers} selectedOffer={selectedOffer} city={city}/>
              </OffersList>
              :
              <EmptyOffersList />
          }
        </div>
      </main>
    </div>);
};

export default MainPage;
