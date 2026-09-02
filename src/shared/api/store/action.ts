import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../models';

export enum ActionTypes {
  CityChanged = 'city/changed',
  OffersLoaded = 'offers/loaded',
}

export const cityChanged = createAction<string>(ActionTypes.CityChanged);

export const offersLoaded = createAction<Offer[]>(ActionTypes.OffersLoaded);
