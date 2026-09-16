import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './store-types/store-types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ApiPaths } from '../const';
import { OfferPreview, AuthorizedUser } from '../models';
import { AuthData } from '../type';
import { dropToken, getToken, setToken } from '../services/token';

export const fetchOffers = createAsyncThunk<
  OfferPreview[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetch', async (_, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(ApiPaths.Offers);
  return data;
});

export const fetchFavoriteOffers = createAsyncThunk<
  OfferPreview[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/favorite/fetch', async (_, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(ApiPaths.Favorite);

  return data;
});

export const checkAuth = createAsyncThunk<
  string,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/checkAuth', async (_, { extra: api }) => {
  const { data } = await api.get<AuthorizedUser>(ApiPaths.Login);

  return data.email;
});

export const login = createAsyncThunk<
  string,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/login', async ({ email, password }, { extra: api }) => {
  const {
    data,
  } = await api.post<AuthorizedUser, AxiosResponse<AuthorizedUser>>(ApiPaths.Login, { email, password });
  setToken(data.token);

  return data.email;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/logout', (_, { extra: api }) => {
  api.delete(ApiPaths.Logout, {
    headers: {
      'x-token': getToken(),
    },
  });
  dropToken();
});
