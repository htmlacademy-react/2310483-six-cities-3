import { PageType } from '../../api/const';
import { Offer } from '../../api/models';
import OfferPreview from '../OfferPreview/OfferPreview';
import classnames from 'classnames';

type OffersPreviewsWrapperProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string) => void;
  pageType?: PageType;
}

const OffersPreviewsWrapper = ({offers, onOfferHover, pageType = PageType.Main}: OffersPreviewsWrapperProps) => {

  const handleOfferHover = (id: string) => {
    if (!onOfferHover) {
      return;
    }
    onOfferHover(id);
  };

  const handleOfferBlur = () => {
    if (!onOfferHover) {
      return;
    }
    onOfferHover('');
  };

  return (
    <div className={
      classnames({
        ['cities__places-list places__list tabs__content']: pageType === PageType.Main,
        ['favorites__places-list places__list']: pageType === PageType.Favorites,
        ['near-places__list places__list']: pageType === PageType.Offer,
      })
    }
    >
      {offers.map((offer) => (
        <OfferPreview
          onMouseEnter={
            () => {
              handleOfferHover(offer.id);
            }
          }
          onMouseLeave={
            () => {
              handleOfferBlur();
            }
          }
          key={offer.id}
          offer={offer}
          pageType={pageType}
        />
      ))}
    </div>
  );
};

export default OffersPreviewsWrapper;
