import {PropsWithChildren} from 'react';
import {Paths, AuthStatus} from '../../api/const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = PropsWithChildren<{
  authStatus: AuthStatus;
} >

const PrivateRoute = ({children, authStatus}: PrivateRouteProps) => (
  authStatus === AuthStatus.Auth ? children : <Navigate to={Paths.Login}/>
);

export default PrivateRoute;
