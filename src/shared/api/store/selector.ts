import { Offer } from '../models';
import { State } from './type';

export const getCity = (state: State) => state.city;

export const getOffers = (state: State) => state.offers;

export const getFilteredOffers = (state: State): Offer[] => {
  const result = state.offers.filter((offer) => offer.city.name === state.city);

  return result;
};
