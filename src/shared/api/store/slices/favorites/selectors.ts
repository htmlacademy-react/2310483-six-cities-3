import { getFavoriteOffersCb } from '../../../../utils/func';
import { SlicesNames } from '../../../const';
import { OfferPreview } from '../../../models';
import { FavoriteOffersRenderingType } from '../../../type';
import { State } from '../../store-types/type';

export const getFavoriteOffers = (state: State) => state[SlicesNames.Favorites].offers;

export const getFavoritesCount = (state: State) => state[SlicesNames.Favorites].count;

export const getRenderingFavoriteOffers = (state: State): FavoriteOffersRenderingType =>
  state[SlicesNames.Favorites].offers
    .reduce(getFavoriteOffersCb, new Map<string, OfferPreview[]>());

export const getFavoriteOffersFetchingStatus = (state: State) => state[SlicesNames.Favorites].isFetching;
