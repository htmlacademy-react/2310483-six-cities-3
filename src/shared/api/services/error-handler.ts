import { setError } from '../store/action';
import { clearError } from '../store/api-action';
import { store } from '../store/store';

export const errorHandler = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
