import { createAction } from '@reduxjs/toolkit';
import { OfferPreview, Offer, Comment } from '../models';
import { AuthStatus } from '../const';

export const changeCity = createAction<string>('city/change');

export const loadOffers = createAction<OfferPreview[]>('offers/load');

export const setAuthStatus = createAction<AuthStatus>('user/setAuthStatus');

export const setError = createAction<string | null>('error/set');

export const setIsFetching = createAction<boolean>('offers/setIsOffersFetching');

export const setIsNotFound = createAction<boolean>('error/isNotFound');

export const setFavoriteOffer = createAction<OfferPreview>('offers/setFavoriteOffers');

export const deleteFavoriteOffer = createAction<string>('offers/deleteFavoriteOffers');

export const loadOffer = createAction<Offer>('offer/load');

export const loadNearbyOffers = createAction<OfferPreview[]>('offer/loadNearbyOffers');

export const loadComments = createAction<Comment[]>('offer/loadComments');

export const loadFavoriteOffers = createAction<OfferPreview[]>('offers/loadFavoriteOffers');
