import { configureStore } from '@reduxjs/toolkit';
import { offersByCity } from './reducer';
import { api } from '../services/api';

export const store = configureStore({
  reducer: offersByCity,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        thunk: {
          extraArgument: api
        },
      },
    ),
});
