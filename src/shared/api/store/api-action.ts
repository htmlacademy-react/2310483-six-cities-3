import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './type';
import { AxiosInstance } from 'axios';
import { ApiPaths, SHOW_ERROR_TIMEOUT } from '../const';
import { Offer } from '../models';
import { loadOffers, setError, setIsOffersFetching } from './action';
import { store } from './store';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offers/fetch',
  async (_, {dispatch, extra: api}) => {
    dispatch(setIsOffersFetching(true));
    const {data} = await api.get<Offer[]>(ApiPaths.Offers);
    dispatch(setIsOffersFetching(false));
    dispatch(
      loadOffers(data)
    );
  }
);

export const clearError = createAsyncThunk(
  'error/clear',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      SHOW_ERROR_TIMEOUT
    );
  }
);
