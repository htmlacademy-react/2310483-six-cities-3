import { getFavoriteOffersCb } from '../../../../utils/func';
import { SlicesNames } from '../../../const';
import { OfferPreview } from '../../../models';
import { FavoriteOffersRenderingType } from '../../../type';
import { State } from '../../store-types/store-types';

export const getFavoriteOffers = (state: Pick<State, SlicesNames.Favorites>) => state[SlicesNames.Favorites].offers;

export const getFavoritesCount = (state: Pick<State, SlicesNames.Favorites>) => state[SlicesNames.Favorites].count;

export const getRenderingFavoriteOffers = (state: Pick<State, SlicesNames.Favorites>): FavoriteOffersRenderingType =>
  state[SlicesNames.Favorites].offers
    .reduce(getFavoriteOffersCb, new Map<string, OfferPreview[]>());

export const getFavoriteOffersFetchingStatus = (state: Pick<State, SlicesNames.Favorites>) => state[SlicesNames.Favorites].isFetching;
