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
  email: string | null;
};

import { store } from '../store';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

