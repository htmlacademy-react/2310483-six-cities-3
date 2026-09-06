import { Link } from 'react-router-dom';
import type { OfferPreview } from '../../api/models';
import { PageType } from '../../api/const';

const offerPreviewClassNames = {
  favorites: {
    card: 'favorites__card place-card',
    imageWrapper: 'favorites__image-wrapper place-card__image-wrapper',
    imageSize: {
      width: 150,
      height: 110,
    },
    cardInfo: 'favorites__card-info place-card__info',
  },
  main: {
    card: 'cities__card place-card',
    imageWrapper: 'cities__image-wrapper place-card__image-wrapper',
    imageSize: {
      width: 260,
      height: 200,
    },
    cardInfo: 'place-card__info',
  },
  offer: {
    card: 'near-places__card place-card',
    imageWrapper: 'near-places__image-wrapper place-card__image-wrapper',
    imageSize: {
      width: 260,
      height: 200,
    },
    cardInfo: 'place-card__info',
  },
};

const getOfferPreviewStyles = (pageType: PageType) => {
  switch (pageType) {
    case PageType.Favorites:
      return offerPreviewClassNames.favorites;
    case PageType.Offer:
      return offerPreviewClassNames.offer;
    case PageType.Main:
      return offerPreviewClassNames.main;
  }
};

type OfferPreviewProps = {
  offer: OfferPreview;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  pageType: PageType;
}

const OfferPreview = (
  {
    offer: {
      id,
      title,
      type,
      price,
      isPremium,
      previewImage,
      rating
    },
    onMouseEnter,
    onMouseLeave,
    pageType
  }: OfferPreviewProps) => {

  const {card, imageWrapper, imageSize, cardInfo} = getOfferPreviewStyles(pageType);
  return (
    <article onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={card}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={imageWrapper}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imageSize.width} height={imageSize.height} alt="Place image"/>
        </Link>
      </div>
      <div className={cardInfo}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${20 * rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default OfferPreview;
