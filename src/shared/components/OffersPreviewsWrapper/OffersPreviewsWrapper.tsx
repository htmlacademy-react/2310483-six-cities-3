import { Offer } from '../../api/models';
import {useState} from 'react';
import OfferPreview from '../OfferPreview/OfferPreview';

type OffersPreviewsWrapperProps = {
  offers: Offer[];
}

const OffersPreviewsWrapper = ({offers}: OffersPreviewsWrapperProps) => {
  const [, setOfferOnFocus] = useState('');

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers?.map((offer) => (
          <
            OfferPreview onMouseEnter={() => setOfferOnFocus(offer.id)} key={offer.id} offer={offer}
          />
        ))
      }
    </div>
  );
};

export default OffersPreviewsWrapper;
