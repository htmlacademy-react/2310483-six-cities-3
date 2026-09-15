import { PageType } from '../../api/const';
import type { OfferPreview as OfferPreviewType } from '../../api/models';
import OfferPreview from '../OfferPreview/OfferPreview';
import classnames from 'classnames';

type OffersPreviewsWrapperProps = {
  offers: OfferPreviewType[];
  onOfferHover?: (offerId: string) => void;
  pageType?: PageType;
}

const OffersPreviewsWrapper = ({offers, onOfferHover, pageType = PageType.Main}: OffersPreviewsWrapperProps) => (
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
        onOfferHover={onOfferHover}
        key={offer.id}
        offer={offer}
        pageType={pageType}
      />
    ))}
  </div>
);

OffersPreviewsWrapper.displayName = 'OffersPreviewsWrapper';

export default OffersPreviewsWrapper;
