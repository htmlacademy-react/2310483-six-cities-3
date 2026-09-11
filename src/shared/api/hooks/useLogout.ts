import { AuthStatus } from '../const';
import { dropToken } from '../services/token';
import { setAuthStatus } from '../store/action';
import {useAppDispatch} from '../store/hooks';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return () => {
    dropToken();
    dispatch(setAuthStatus(AuthStatus.No_Auth));
  };
};
