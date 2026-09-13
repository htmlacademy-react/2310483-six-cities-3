import Header from '../../shared/components/Header/Header';
import EmptyOffersList from './components/EmptyOffersList.tsx';
import Map from '../../shared/components/Map/Map.tsx';
import { useState, useCallback } from 'react';
import OffersList from './components/OffersList.tsx';
import CitiesList from './components/CitiesList.tsx';
import { useAppSelector } from '../../shared/api/store/hooks.ts';
import { getFilteredOffers, getOffersFetchingStatus } from '../../shared/api/store/slices/offers/selector.ts';
import Spinner from '../../shared/components/Spinner/Spinner.tsx';
import { getFavoriteOffersFetchingStatus } from '../../shared/api/store/slices/favorites/selectors.ts';

const MainPage = () => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const offers = useAppSelector(getFilteredOffers);
  const isOffersFetching = useAppSelector(getOffersFetchingStatus);
  const isFavoritesFetching = useAppSelector(getFavoriteOffersFetchingStatus);
  const handleOfferHover = useCallback((id: string) => {
    const offerId = offers?.find((item) => item.id === id)?.id;
    setSelectedOfferId(offerId || null);
  }, [offers]);

  if (isOffersFetching || isFavoritesFetching) {
    return <Spinner/>;
  }

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
