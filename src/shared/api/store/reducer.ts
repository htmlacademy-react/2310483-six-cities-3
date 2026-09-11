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
  setIsNotFound,
  setFavoriteOffer,
  deleteFavoriteOffer,
  loadFavoriteOffers
} from './action';
import { AuthStatus } from '../const';
import { OfferData } from '../type';

export type Store = {
  city: string;
  offers: OfferPreview[];
  favoriteOffers: {
    offers: OfferPreview[];
    count: number;
  };
  currentOfferData: OfferData;
  authStatus: AuthStatus;
  error: string | null;
  isFetching: boolean;
  isNotFound: boolean;
};

export const initialState: Store = {
  city: 'Paris',
  offers: [],
  favoriteOffers: {
    offers: [],
    count: 0
  },
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
    state.favoriteOffers = {
      offers: payload,
      count: payload.length
    };
  });

  addCase(setFavoriteOffer, (state, { payload }) => {
    state.favoriteOffers = {
      offers: [...state.favoriteOffers.offers, payload],
      count: state.favoriteOffers.count + 1
    };
  });

  addCase(deleteFavoriteOffer, (state, { payload }) => {
    state.favoriteOffers = {
      offers: state.favoriteOffers.offers.filter((offer) => offer.id !== payload),
      count: state.favoriteOffers.count - 1
    };
  });

  addCase(setIsNotFound, (state, { payload }) => {
    state.isNotFound = payload;
  });
});
