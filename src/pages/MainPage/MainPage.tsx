import { AuthStatus } from '../../shared/api/const.ts';
import { City, Offer } from '../../shared/api/models.ts';
import Header from '../../shared/components/Header/Header.tsx';
import OffersPreviewsWrapper from '../../shared/components/OffersPreviewsWrapper/OffersPreviewsWrapper.tsx';
import EmptyOffersList from './components/EmptyOffersList.tsx';
import Map from '../../shared/components/Map/Map.tsx';
import { useState } from 'react';

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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers?.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by&nbsp;</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                {/* <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul> */}
              </form>
              {
                offers
                  ?
                  <OffersPreviewsWrapper onOfferHover={handleOfferHover} offers={offers}/>
                  :
                  <EmptyOffersList/>
              }
            </section>
            <div className="cities__right-section">
              {
                offers
                  &&
                  <section className="cities__map map">
                    <Map offers={offers} selectedOffer={selectedOffer} city={city}/>
                  </section>
              }
            </div>
          </div>
        </div>
      </main>
    </div>);
};

export default MainPage;
