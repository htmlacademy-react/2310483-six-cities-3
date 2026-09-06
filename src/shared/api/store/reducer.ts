import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../models';
import { changeCity, loadOffers, requierAuth, setError, setIsOffersFetching } from './action';
import { AuthStatus } from '../const';

export type Store = {
  city: string;
  offers: Offer[];
  authStatus: AuthStatus;
  error: string | null;
  isOffersFetching: boolean;
};

export const initialState: Store = {
  city: 'Paris',
  offers: [],
  authStatus: AuthStatus.Unknown,
  error: null,
  isOffersFetching: false,
};

export const offersByCity = createReducer(initialState, ({addCase}) => {
  addCase(changeCity, (state, { payload }) => {
    state.city = payload;
  });
  addCase(loadOffers, (state, { payload }) => {
    state.offers = payload;
  });
  addCase(requierAuth, (state, { payload }) => {
    state.authStatus = payload;
  });
  addCase(setError, (state, { payload }) => {
    state.error = payload;
  });
  addCase(setIsOffersFetching, (state, { payload }) => {
    state.isOffersFetching = payload;
  });
});
