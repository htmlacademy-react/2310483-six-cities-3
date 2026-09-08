import { getFavoriteOffersCb } from '../../utils/func';
import { Offer } from '../models';
import { FavoriteOffers } from '../type';
import { State } from './type';

export const getCity = (state: State) => state.city;

export const getOffers = (state: State) => state.offers;

export const getFilteredOffers = (state: State): Offer[] =>
  state.offers.filter((offer) => offer.city.name === state.city);


export const getFavoriteOffers = (state: State): FavoriteOffers =>
  state.offers
    .filter((offer) => offer.isFavorite)
    .reduce(getFavoriteOffersCb, new Map<string, Offer[]>());
