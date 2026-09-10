import Header from '../../shared/components/Header/Header';
import EmptyOffersList from './components/EmptyOffersList.tsx';
import Map from '../../shared/components/Map/Map.tsx';
import { useState } from 'react';
import OffersList from './components/OffersList.tsx';
import CitiesList from './components/CitiesList.tsx';
import { getFilteredOffers } from '../../shared/api/store/selector.ts';
import { useAppSelector } from '../../shared/api/store/hooks.ts';

const MainPage = () => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const offers = useAppSelector(getFilteredOffers);
  const isFetching = useAppSelector((state) => state.isFetching);

  if (isFetching) {
    return null;
  }

  const handleOfferHover = (id: string) => {
    const offerId = offers?.find((item) => item.id === id)?.id;
    setSelectedOfferId(offerId || null);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
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
                <Map offers={offers} selectedOfferId={selectedOfferId} center={offers[0].city.location}/>
              </OffersList>
              :
              <EmptyOffersList />
          }
        </div>
      </main>
    </div>);
};

export default MainPage;
