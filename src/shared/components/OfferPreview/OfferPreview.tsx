import { Link } from 'react-router-dom';
import { Offer } from '../../api/models';

type OfferPreviewProps = {
  offer: Offer;
  onMouseEnter?: () => void;
  isFavoritesCard?: boolean;
}

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
    cardInfo: 'favorites__card-info place-card__info',
  },
};

const OfferPreview = ({offer: {
  id,
  title,
  type,
  price,
  isPremium,
  images,
},
onMouseEnter,
isFavoritesCard
}: OfferPreviewProps) => {
  const styles = isFavoritesCard ? offerPreviewClassNames.favorites : offerPreviewClassNames.main;

  return (
    <article onMouseEnter={onMouseEnter} className={styles.card}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={styles.imageWrapper}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={images[0]} width={styles.imageSize.width} height={styles.imageSize.height} alt="Place image"/>
        </Link>
      </div>
      <div className={styles.cardInfo}>
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
            <span style={{width: '80%'}}></span>
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
