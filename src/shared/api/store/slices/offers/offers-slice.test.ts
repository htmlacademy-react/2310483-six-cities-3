import { generateOffers } from '../../../../utils/mocks/fake-data';
import { fetchOffers } from '../../api-action';
import { OffersData } from '../../store-types/store-types';
import {changeCity, offersSlice} from './offers-slice';

describe('Favorites Slice', () => {
  it('Should return initial state with empty action', () => {
    const expectedState: OffersData = {
      city: 'Paris',
      offers: [],
      isFetching: false,
    };

    const emptyAction = {
      type: '',
    };

    const result = offersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const expectedState: OffersData = {
      city: 'Paris',
      offers: [],
      isFetching: false,
    };

    const emptyAction = {
      type: '',
    };

    const result = offersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should change the city with action changeCity', () => {
    const expectedState: OffersData = {
      city: 'London',
      offers: [],
      isFetching: false,
    };

    const result = offersSlice.reducer(undefined, changeCity('London'));
    expect(result).toEqual(expectedState);
  });

  it('Should set isFetching to "true" with action fetchOffers.pending', () => {
    const expectedState: OffersData = {
      city: 'Paris',
      offers: [],
      isFetching: true,
    };

    const result = offersSlice.reducer(undefined, fetchOffers.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set isFetching "false", an array of offers with action fetchOffers.fulfilled', () => {
    const offers = generateOffers(2, false);
    const expectedState: OffersData = {
      city: 'Paris',
      offers: offers,
      isFetching: false,
    };

    const result = offersSlice.reducer(undefined, fetchOffers.fulfilled(offers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Should set isFetching "false" with action fetchOffers.rejected', () => {
    const expectedState: OffersData = {
      city: 'Paris',
      offers: [],
      isFetching: false,
    };
    const result = offersSlice.reducer(undefined, fetchOffers.rejected);
    expect(result).toEqual(expectedState);
  });
});
