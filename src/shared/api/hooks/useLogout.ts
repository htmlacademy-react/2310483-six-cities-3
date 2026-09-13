import { logout } from '../store/api-action';
import { useAppDispatch } from '../store/hooks';
import { clearFavoriteOffers } from '../store/slices/favorites/favorites-slice';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(logout());
    dispatch(clearFavoriteOffers());
  };
};
