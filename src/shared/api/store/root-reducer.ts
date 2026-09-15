import { combineReducers } from '@reduxjs/toolkit';
import { SlicesNames } from '../const';
import { offersSlice } from './slices/offers/offers-slice';
import { favoritesSlice } from './slices/favorites/favorites-slice';
import { userSlice } from './slices/user/user-slice';


export const rootReducer = combineReducers({
  [SlicesNames.Offers]: offersSlice.reducer,
  [SlicesNames.Favorites]: favoritesSlice.reducer,
  [SlicesNames.User]: userSlice.reducer,
});

