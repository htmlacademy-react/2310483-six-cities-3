import { OfferPreview } from '../api/models';
import { FavoriteOffersRenderingType } from '../api/type';

export const getFavoriteOffersCb = (acc: FavoriteOffersRenderingType, offer: OfferPreview): FavoriteOffersRenderingType => {
  if (acc.has(offer.city.name)) {
    acc.get(offer.city.name)?.push(offer);
    return acc;
  }
  acc.set(offer.city.name, [offer]);
  return acc;
};

export const OffersSortCb = {
  'Popular': (): number => 0,
  'Price: low to high': (a: OfferPreview, b: OfferPreview): number => a.price - b.price,
  'Price: high to low': (a: OfferPreview, b: OfferPreview): number => b.price - a.price,
  'Top rated first': (a: OfferPreview, b: OfferPreview): number => b.rating - a.rating
};

export const getCommentDate = (date: Date): string => {
  const monthsNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const month = monthsNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};
