import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../models';
import { AuthStatus } from '../const';

export const changeCity = createAction<string>('city/change');

export const loadOffers = createAction<Offer[]>('offers/load');

export const setAuthStatus = createAction<AuthStatus>('user/setAuthStatus');

export const setError = createAction<string | null>('error/set');

export const setIsOffersFetching = createAction<boolean>('offers/setIsOffersFetching');
