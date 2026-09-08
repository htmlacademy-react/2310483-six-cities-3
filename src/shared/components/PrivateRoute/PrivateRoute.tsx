import {PropsWithChildren} from 'react';
import {Paths, AuthStatus} from '../../api/const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../api/store/hooks';

type PrivateRouteProps = PropsWithChildren;

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={Paths.Login}/>
  );
};

export default PrivateRoute;
