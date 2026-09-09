import { useState, useEffect } from 'react';
import { OfferPreview } from '../../../shared/api/models';
import OffersPreviewsWrapper from '../../../shared/components/OffersPreviewsWrapper/OffersPreviewsWrapper';
import { OffersSortCb } from '../../../shared/utils/func';
import OffersSort from './OffersSort';
import { SortOption } from '../../../shared/api/type';

type OffersListProps = {
  offers: OfferPreview[];
  handleOfferHover: (id: string) => void;
  children: React.ReactNode;
}

const OffersList = ({offers, handleOfferHover, children}: OffersListProps) => {
  const [sortedOffers, setSortedOffers] = useState<OfferPreview[]>([]);
  const [activeSort, setActiveSort] = useState<SortOption>('Popular');

  useEffect(
    () => {
      setSortedOffers(offers);
      setActiveSort('Popular');
    },
    [offers]
  );

  const handleOffersSort = (sortOption: SortOption) => {
    const result = [...offers].sort(OffersSortCb[sortOption]);
    setSortedOffers(result);
    setActiveSort(sortOption);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers?.length} places to stay in {offers[0]?.city.name}</b>
        <OffersSort activeSort={activeSort} onSortChange={handleOffersSort}/>
        <OffersPreviewsWrapper onOfferHover={handleOfferHover} offers={sortedOffers} />
      </section>
      <div className="cities__right-section">
        {children}
      </div>
    </div>
  );
};

export default OffersList;
