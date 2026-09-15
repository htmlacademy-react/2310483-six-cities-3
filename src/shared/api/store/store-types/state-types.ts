import { AuthStatus } from '../../const';
import { OfferPreview } from '../../models';

export type FavoritesData = {
  offers: OfferPreview[];
  count: number;
  isFetching: boolean;
};

export type OffersData = {
  city: string;
  offers: OfferPreview[];
  isFetching: boolean;
};

export type UserData = {
  authStatus: AuthStatus;
};
