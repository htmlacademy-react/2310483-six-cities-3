import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../../const';
import { FavoritesData } from '../../store-types/state-types';
import { OfferPreview } from '../../../models';
import { fetchFavoriteOffers } from '../../api-action';

const initialState: FavoritesData = {
  offers: [],
  count: 0,
  processing: {
    hasError: false,
    isFetching: false,
  }
};

export const favoritesSlice = createSlice({
  name: SlicesNames.Favorites,
  initialState,
  reducers: {
    setFavoriteOffer(state, {payload}: PayloadAction<OfferPreview>) {
      state.offers = [...state.offers, payload];
      state.count = state.count + 1;
    },
    deleteFavoriteOffer(state, {payload}: PayloadAction<string>) {
      state.offers = state.offers.filter((offer) => offer.id !== payload);
      state.count = state.count - 1;
    },
    clearFavoriteOffers(state) {
      state.offers = [];
      state.count = 0;
    },
    clearFavoritesError(state) {
      state.processing.hasError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.processing.isFetching = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, { payload }) => {
        state.processing = {
          hasError: false,
          isFetching: false,
        };
        state.offers = payload;
        state.count = payload.length;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.processing = {
          hasError: true,
          isFetching: false
        };
      });
  }
});

export const { setFavoriteOffer, deleteFavoriteOffer, clearFavoriteOffers, clearFavoritesError } = favoritesSlice.actions;
