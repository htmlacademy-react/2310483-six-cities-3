import { PageType } from '../../../shared/api/const';
import { FavoriteOffers } from '../../../shared/api/type';
import OfferPreview from '../../../shared/components/OfferPreview/OfferPreview';

type FavoriteLocationItemProps = {
  favoriteOffers: FavoriteOffers;
}

const FavoriteLocationList = ({favoriteOffers}: FavoriteLocationItemProps) => (
  <ul className="favorites__list">
    {
      Array.from(favoriteOffers)
        .map(([city, offers]) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {
                offers
                  .map((offer) => (
                    <OfferPreview
                      key={offer.id}
                      offer={offer}
                      pageType={PageType.Favorites}
                    />
                  ))
              }
            </div>
          </li>
        ))
    }
  </ul>
);

export default FavoriteLocationList;
