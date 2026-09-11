import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './type';
import { AxiosInstance } from 'axios';
import { ApiPaths, AuthStatus, SHOW_ERROR_TIMEOUT } from '../const';
import { OfferPreview, Offer, Comment, AuthorizedUser } from '../models';
import { loadOffers, setAuthStatus, setError, setIsFetching, loadOffer, loadNearbyOffers, loadComments, setIsNotFound, loadFavoriteOffers } from './action';
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
    dispatch(setIsFetching(true));
    const {data} = await api.get<OfferPreview[]>(ApiPaths.Offers);
    dispatch(loadOffers(data));
    dispatch(setIsFetching(false));
  }
);

export const fetchFavoriteOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/favorite/fetch',
  async (_, {dispatch, extra: api}) => {
    dispatch(setIsFetching(true));
    const {data} = await api.get<OfferPreview[]>(ApiPaths.Favorite);
    dispatch(loadFavoriteOffers(data));
    dispatch(setIsFetching(false));

  }
);

export const fetchOffer = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offer/fetch',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${ApiPaths.Offers}/${id}`);
    dispatch(loadOffer(data));
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offer/nearby/fetch',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(`${ApiPaths.Offers}/${id}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

export const fetchComments = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'comments/fetch',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${ApiPaths.Comments}/${id}`);
    dispatch(loadComments(data));
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
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<AuthorizedUser>(ApiPaths.Login, {email, password});
    setToken(token);
    dispatch(setAuthStatus(AuthStatus.Auth));
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
      () => {
        store.dispatch(setIsNotFound(false));
        store.dispatch(setError(null));
      },
      SHOW_ERROR_TIMEOUT
    );
  }
);
