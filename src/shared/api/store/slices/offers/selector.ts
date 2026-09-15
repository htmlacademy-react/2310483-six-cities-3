import { SlicesNames } from '../../../const';
import { OfferPreview } from '../../../models';
import { State } from '../../store-types/type';

export const getCity = (state: State): string => state[SlicesNames.Offers].city;

export const getOffers = (state: State): OfferPreview[] => state[SlicesNames.Offers].offers;

export const getFilteredOffers = (state: State): OfferPreview[] =>
  state[SlicesNames.Offers].offers.filter((offer) => offer.city.name === state[SlicesNames.Offers].city);

export const getOffersFetchingStatus = (state: State) => state[SlicesNames.Offers].isFetching;
