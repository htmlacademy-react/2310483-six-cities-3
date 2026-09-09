import { createReducer } from '@reduxjs/toolkit';
import { OfferPreview } from '../models';
import {
  changeCity,
  loadOffers,
  setAuthStatus,
  setError,
  setIsFetching,
  loadOffer,
  loadComments,
  loadNearbyOffers,
  loadFavoriteOffers,
  setIsNotFound
} from './action';
import { AuthStatus } from '../const';
import { OfferData } from '../type';

export type Store = {
  city: string;
  offers: OfferPreview[];
  favoriteOffers: OfferPreview[];
  currentOfferData: OfferData;
  authStatus: AuthStatus;
  error: string | null;
  isFetching: boolean;
  isNotFound: boolean;
};

export const initialState: Store = {
  city: 'Paris',
  offers: [],
  favoriteOffers: [],
  currentOfferData: {} as OfferData,
  authStatus: AuthStatus.Unknown,
  error: null,
  isFetching: false,
  isNotFound: false
};

export const offersByCity = createReducer(initialState, ({addCase}) => {
  addCase(changeCity, (state, { payload }) => {
    state.city = payload;
  });
  addCase(loadOffers, (state, { payload }) => {
    state.offers = payload;
  });
  addCase(setAuthStatus, (state, { payload }) => {
    state.authStatus = payload;
  });
  addCase(setError, (state, { payload }) => {
    state.error = payload;
  });
  addCase(setIsFetching, (state, { payload }) => {
    state.isFetching = payload;
  });
  addCase(loadOffer, (state, { payload }) => {
    state.currentOfferData.offer = payload;
  });
  addCase(loadNearbyOffers, (state, { payload }) => {
    state.currentOfferData.nearbyOffers = payload;
  });
  addCase(loadComments, (state, { payload }) => {
    state.currentOfferData.comments = payload;
  });
  addCase(loadFavoriteOffers, (state, { payload }) => {
    state.favoriteOffers = payload;
  });
  addCase(setIsNotFound, (state, { payload }) => {
    state.isNotFound = payload;
  });
});
