import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../../const';
import { FavoritesData } from '../../store-types/store-types';
import { OfferPreview } from '../../../models';
import { fetchFavoriteOffers } from '../../api-action';

const initialState: FavoritesData = {
  offers: [],
  count: 0,
  isFetching: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.offers = payload;
        state.count = payload.length;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFetching = false;
      });
  }
});

export const { setFavoriteOffer, deleteFavoriteOffer, clearFavoriteOffers } = favoritesSlice.actions;
