import { configureStore } from '@reduxjs/toolkit';
import { offersByCity } from './reducer';
import { createApi } from '../services/api';

const api = createApi();

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
