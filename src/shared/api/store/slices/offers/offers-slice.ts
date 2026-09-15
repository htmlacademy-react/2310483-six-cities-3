import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../../const';
import { OffersData } from '../../store-types/state-types';
import { fetchOffers } from '../../api-action';

const initialState: OffersData = {
  city: 'Paris',
  offers: [],
  isFetching: false,
};

export const offersSlice = createSlice({
  name: SlicesNames.Offers,
  initialState,
  reducers: {
    changeCity(state, {payload}: PayloadAction<string>) {
      state.city = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchOffers.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.offers = payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isFetching = false;
      });
  }
});

export const { changeCity } = offersSlice.actions;
