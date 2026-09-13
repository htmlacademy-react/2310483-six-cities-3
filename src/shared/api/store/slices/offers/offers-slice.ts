import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../../const';
import { OffersData } from '../../store-types/state-types';
import { fetchOffers } from '../../api-action';

const initialState: OffersData = {
  city: 'Paris',
  offers: [],
  processing: {
    hasError: false,
    isFetching: false,
  }
};

export const offersSlice = createSlice({
  name: SlicesNames.Offers,
  initialState,
  reducers: {
    changeCity(state, {payload}: PayloadAction<string>) {
      state.city = payload;
    },
    clearOffersError(state) {
      state.processing.hasError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.processing = {
          hasError: false,
          isFetching: true,
        };
      })
      .addCase(fetchOffers.fulfilled, (state, { payload }) => {
        state.processing = {
          hasError: false,
          isFetching: false,
        };
        state.offers = payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.processing = {
          hasError: true,
          isFetching: false,
        };
      });
  }
});

export const { changeCity, clearOffersError } = offersSlice.actions;
