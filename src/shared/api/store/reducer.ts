import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../models';
import { cityChanged, offersLoaded } from './action';

export type Store = {
  city: string;
  offers: Offer[];
};

export const initialState: Store = {
  city: 'Paris',
  offers: [],
};

export const offersByCity = createReducer(initialState, (builder) => {
  builder.addCase(cityChanged, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(offersLoaded, (state, action) => {
    state.offers = action.payload;
  });
});
