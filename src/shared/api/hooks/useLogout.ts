import { dropToken } from '../services/token';
import { logout } from '../store/api-action';
import { useAppDispatch } from '../store/hooks';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return () => {
    dropToken();
    dispatch(logout());
  };
};
