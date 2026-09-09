import { setError, setIsNotFound } from '../store/action';
import { clearError } from '../store/api-action';
import { store } from '../store/store';

export const errorHandler = (message: string, status: number): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
  if (status === 404) {
    store.dispatch(setIsNotFound(true));
  }
};
