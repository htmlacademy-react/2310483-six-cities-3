import { configureStore } from '@reduxjs/toolkit';
import { offersByCity } from './reducer';

export const store = configureStore({
  reducer: offersByCity
});
