import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './type';
import { AxiosInstance } from 'axios';
import { ApiPaths, AuthStatus, SHOW_ERROR_TIMEOUT } from '../const';
import { Offer, AuthorizedUser } from '../models';
import { loadOffers, setAuthStatus, setError, setIsOffersFetching } from './action';
import { store } from './store';
import { AuthData } from '../type';
import { dropToken, setToken } from '../services/token';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/fetch',
  async (_, {dispatch, extra: api}) => {
    dispatch(setIsOffersFetching(true));
    const {data} = await api.get<Offer[]>(ApiPaths.Offers);
    dispatch(setIsOffersFetching(false));
    dispatch(
      loadOffers(data)
    );
  }
);

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async (_, {dispatch, extra: api}) => {
    try {
      await api.get<AuthorizedUser>(ApiPaths.Login);
      dispatch(setAuthStatus(AuthStatus.Auth));
    } catch {
      dispatch(setAuthStatus(AuthStatus.No_Auth));
    }
  }
);

export const login = createAsyncThunk<
  number,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {status, data: {token}} = await api.post<AuthorizedUser>(ApiPaths.Login, {email, password});
    setToken(token);
    dispatch(setAuthStatus(AuthStatus.Auth));

    return status;
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/logout',
  (_, {dispatch, extra: api}) => {
    api.delete(ApiPaths.Logout);
    dropToken();
    dispatch(setAuthStatus(AuthStatus.No_Auth));
  }
);

export const clearError = createAsyncThunk(
  'error/clear',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      SHOW_ERROR_TIMEOUT
    );
  }
);
