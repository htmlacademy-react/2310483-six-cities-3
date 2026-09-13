import { AuthStatus } from '../../const';
import { OfferPreview } from '../../models';

export type FavoritesData = {
  offers: OfferPreview[];
  count: number;
  processing: ApiProcessingData;
};

export type OffersData = {
  city: string;
  offers: OfferPreview[];
  processing: ApiProcessingData;
};

export type UserData = {
  authStatus: AuthStatus;
}

export type ApiProcessingData = {
  hasError: boolean;
  isFetching: boolean;
}
