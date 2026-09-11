import { getFavoriteOffersCb } from '../../utils/func';
import { OfferPreview } from '../models';
import { FavoriteOffers } from '../type';
import { State } from './type';

export const getCity = (state: State) => state.city;

export const getOffers = (state: State) => state.offers;

export const getFilteredOffers = (state: State): OfferPreview[] =>
  state.offers.filter((offer) => offer.city.name === state.city);

export const getFavoriteOffers = (state: State): FavoriteOffers =>
  state.favoriteOffers.offers
    .reduce(getFavoriteOffersCb, new Map<string, OfferPreview[]>());
