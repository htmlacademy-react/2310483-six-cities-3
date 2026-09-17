import { generateOffers } from '../../../../utils/mocks/fake-data';
import { fetchFavoriteOffers } from '../../api-action';
import { FavoritesData } from '../../store-types/store-types';
import {favoritesSlice} from './favorites-slice';

describe('Favorites Slice', () => {
  it('Should return initial state with empty action', () => {
    const expectedState: FavoritesData = {
      offers: [],
      count: 0,
      isFetching: false,
    };

    const emptyAction = {
      type: '',
    };

    const result = favoritesSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const expectedState: FavoritesData = {
      offers: [],
      count: 0,
      isFetching: false,
    };

    const emptyAction = {
      type: '',
    };

    const result = favoritesSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should set isFetching "true" with action fetchFavoriteOffers.pending', () => {
    const expectedState: FavoritesData = {
      offers: [],
      count: 0,
      isFetching: true,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set isFetching "false", an array of favorite offers and count based on array length with action fetchFavoriteOffers.fulfilled', () => {
    const offers = generateOffers(2, true);
    const expectedState: FavoritesData = {
      offers: offers,
      count: offers.length,
      isFetching: false,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.fulfilled(offers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Should set isFetching "false" with action fetchFavoriteOffers.rejected', () => {
    const expectedState: FavoritesData = {
      offers: [],
      count: 0,
      isFetching: false,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.rejected);
    expect(result).toEqual(expectedState);
  });
});
