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

export const OffersSortCb = {
  'Popular': (): number => 0,
  'Price: low to high': (a: Offer, b: Offer): number => a.price - b.price,
  'Price: high to low': (a: Offer, b: Offer): number => b.price - a.price,
  'Top rated first': (a: Offer, b: Offer): number => b.rating - a.rating
};
