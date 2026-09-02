import { AuthStatus, PageType } from '../../shared/api/const';
import Header from '../../shared/components/Header/Header';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import OfferGallery from './components/OfferGallery';
import Map from '../../shared/components/Map/Map';
import {useParams} from 'react-router-dom';
import OffersPreviewsWrapper from '../../shared/components/OffersPreviewsWrapper/OffersPreviewsWrapper';
import { useAppSelector } from '../../shared/api/store/hooks';
import { getFilteredOffers } from '../../shared/api/store/selector';

const OfferPage = () => {
  const params = useParams();
  const offers = useAppSelector(getFilteredOffers);
  const currentOffer = offers.find((offer) => offer.id === params.id);
  const restOffers = offers.filter((offer) => offer.id !== currentOffer?.id);
  if (!currentOffer) {
    return <NotFoundPage/>;
  }

  const {
    title,
    type,
    price,
    isPremium,
    rating,
    description,
    maxAdults,
    bedrooms,
    goods,
    host,
    images,
  } = currentOffer;

  return (
    <div className="page">
      <Header authStatus={AuthStatus.Auth} />
      <main className="page__main page__main--offer">
        <section className="offer">
          {images && <OfferGallery images={images}/>}
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={host.avatar} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {
                    host.isPro &&
                    <span className="offer__user-status">
                        Pro
                    </span>
                  }
                </div>
                <div className="offer__description">
                  {description.split(/\r?\n|\r|\n/g).map((paragraph) => (
                    <p key={paragraph.split(' ').splice(Math.round(Math.random() * paragraph.length)).join('')}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              {
                // comments && <OffersReviewsList comments={comments}/>
              }
            </div>
          </div>
          <section className="offer__map map">
            <Map
              offers={offers}
              center={currentOffer.location}
              selectedOffer={currentOffer}
              pageType={PageType.Offer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersPreviewsWrapper offers={restOffers} pageType={PageType.Offer}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
