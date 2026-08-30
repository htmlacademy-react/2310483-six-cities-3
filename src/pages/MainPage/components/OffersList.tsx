import { Offer } from '../../../shared/api/models';
import OffersPreviewsWrapper from '../../../shared/components/OffersPreviewsWrapper/OffersPreviewsWrapper';

type OffersListProps = {
  offers: Offer[];
  handleOfferHover: (id: string) => void;
  children: React.ReactNode;
}

const OffersList = ({offers, handleOfferHover, children}: OffersListProps) => (
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
      <OffersPreviewsWrapper onOfferHover={handleOfferHover} offers={offers} />
    </section>
    <div className="cities__right-section">
      {children}
    </div>
  </div>
);

export default OffersList;
