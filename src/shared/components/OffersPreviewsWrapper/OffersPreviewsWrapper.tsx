import { Offer } from '../../api/models';
import OfferPreview from '../OfferPreview/OfferPreview';

type OffersPreviewsWrapperProps = {
  offers: Offer[];
  onOfferHover: (offerId: string) => void;
}

const OffersPreviewsWrapper = ({offers, onOfferHover}: OffersPreviewsWrapperProps) => {

  const handleOfferHover = (id: string) => {
    onOfferHover(id);
  };

  const handleOfferBlur = () => {
    onOfferHover('');
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers?.map((offer) => (
          <OfferPreview
            onMouseEnter={() => {
              handleOfferHover(offer.id);
            }}
            onMouseLeave={() => {
              handleOfferBlur();
            }}
            key={offer.id}
            offer={offer}
          />
        ))
      }
    </div>
  );
};

export default OffersPreviewsWrapper;
