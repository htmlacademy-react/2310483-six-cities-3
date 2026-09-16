import { generateOfferPreview } from '../../../../utils/mocks/fake-data';
import { SlicesNames } from '../../../const';
import { OfferPreview } from '../../../models';
import { getFavoriteOffers, getFavoriteOffersFetchingStatus, getFavoritesCount, getRenderingFavoriteOffers } from './selectors';


describe('Favorites Slice Selectors', () => {
  const state = {
    [SlicesNames.Favorites]: {
      offers: [
        generateOfferPreview(true, 'Paris'),
        generateOfferPreview(true, 'London'),
      ],
      count: 0,
      isFetching: false,
    }
  };

  it('Should return an array of favorite offers', () => {
    const offers = state[SlicesNames.Favorites].offers;
    const result = getFavoriteOffers(state);

    expect(result).toEqual(offers);
  });

  it('Should return a count of favorite offers', () => {
    const count = state[SlicesNames.Favorites].count;
    const result = getFavoritesCount(state);

    expect(result).toEqual(count);
  });

  it('Should return an isFetching flag of favorite offers', () => {
    const isFetching = state[SlicesNames.Favorites].isFetching;
    const result = getFavoriteOffersFetchingStatus(state);

    expect(result).toEqual(isFetching);
  });

  it('Should return a Map object of favorite offers', () => {
    const {offers} = state[SlicesNames.Favorites];
    const offersMap = new Map<string, OfferPreview[]>([
      [offers[0].city.name, [offers[0]]],
      [offers[1].city.name, [offers[1]]],
    ]);
    const result = getRenderingFavoriteOffers(state);

    expect(result).toEqual(offersMap);
  });

});
