import { AuthStatus } from '../../shared/api/const.ts';
import { Offer } from '../../shared/api/models.ts';
import Header from '../../shared/components/Header/Header.tsx';
import EmptyOffersList from './components/EmptyOffersList.tsx';
import Map from '../../shared/components/Map/Map.tsx';
import { useState } from 'react';
import OffersList from './components/OffersList.tsx';
import CitiesList from './components/CitiesList.tsx';
import { getFilteredOffers } from '../../shared/api/store/selector.ts';
import { useAppSelector } from '../../shared/api/store/hooks.ts';
import Spinner from '../../shared/components/Spinner/Spinner.tsx';

const MainPage = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const offers = useAppSelector(getFilteredOffers);
  const isOffersFetching = useAppSelector((state) => state.isOffersFetching);
  if (isOffersFetching) {
    return (
      <Spinner />
    );
  }

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
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {
            offers.length > 0
              ?
              <OffersList offers={offers} handleOfferHover={handleOfferHover}>
                <Map offers={offers} selectedOffer={selectedOffer} center={offers[0].city.location}/>
              </OffersList>
              :
              <EmptyOffersList />
          }
        </div>
      </main>
    </div>);
};

export default MainPage;
