import { SlicesNames } from '../../../const';
import { OfferPreview } from '../../../models';
import { State } from '../../store-types/store-types';

export const getCity = (state: Pick<State, SlicesNames.Offers>): string => state[SlicesNames.Offers].city;

export const getOffers = (state: Pick<State, SlicesNames.Offers>): OfferPreview[] => state[SlicesNames.Offers].offers;

export const getFilteredOffers = (state: Pick<State, SlicesNames.Offers>): OfferPreview[] =>
  state[SlicesNames.Offers].offers.filter((offer) => offer.city.name === state[SlicesNames.Offers].city);

export const getOffersFetchingStatus = (state: Pick<State, SlicesNames.Offers>) => state[SlicesNames.Offers].isFetching;
