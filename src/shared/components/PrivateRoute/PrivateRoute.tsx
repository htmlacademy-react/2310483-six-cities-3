import {PropsWithChildren} from 'react';
import {Paths, AuthStatus} from '../../api/const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../api/store/hooks';
import { getAuthStatus } from '../../api/store/slices/user/selectors';

type PrivateRouteProps = PropsWithChildren;

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={Paths.Login}/>
  );
};

export default PrivateRoute;
