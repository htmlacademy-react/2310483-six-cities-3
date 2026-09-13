import { clearFavoritesError } from '../store/slices/favorites/favorites-slice';
import { clearOffersError } from '../store/slices/offers/offers-slice';
import { store } from '../store/store';

export const errorHandler = (): void => {
  store.dispatch(clearOffersError());
  store.dispatch(clearFavoritesError());
};
