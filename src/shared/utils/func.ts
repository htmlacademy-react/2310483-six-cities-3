import { Offer } from '../api/models';
import { FavoriteOffers } from '../api/type';

export const getFavoriteOffersCb = (acc: FavoriteOffers, offer: Offer): FavoriteOffers => {
  if (acc.has(offer.city.name)) {
    acc.get(offer.city.name)?.push(offer);
    return acc;
  }
  acc.set(offer.city.name, [offer]);
  return acc;
};
