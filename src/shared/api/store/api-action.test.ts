import MockAdapter from 'axios-mock-adapter';
import { api } from '../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from './store-types/store-types';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../utils/mocks/fake-data';
import { ApiPaths, AuthStatus, SlicesNames } from '../const';
import { checkAuth, fetchFavoriteOffers, fetchOffers, login, logout } from './api-action';
import { AuthData } from '../type';
import * as tokenStorage from '../../api/services/token';


describe('Api actions', () => {
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [SlicesNames.User]: {
        authStatus: AuthStatus.Unknown,
      },
      [SlicesNames.Offers]: {
        city: 'Paris',
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Favorites]: {
        offers: [],
        count: 0,
        isFetching: false,
      },
    });
  });

  describe('checkAuth', () => {
    it('Should dispatch "checkAuth.pending" and "checkAuth.fulfilled" with thunk "checkAuth"', async () => {
      mockAxiosAdapter.onGet(ApiPaths.Login).reply(200);
      await store.dispatch(checkAuth());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type
      ]);
    });

    it('Should dispatch "checkAuth.pending" and "checkAuth.rejected" wuth thunk "chekcAuth"', async () => {
      mockAxiosAdapter.onGet(ApiPaths.Login).reply(401);
      await store.dispatch(checkAuth());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });

  describe('fetchOffers', () => {
    it('Should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" with status 200', async () => {
      mockAxiosAdapter.onGet(ApiPaths.Offers).reply(200);
      await store.dispatch(fetchOffers());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type
      ]);
    });

    it('Should dispatch "fetchOffers.pending" and "fetchOffers.rejected" with status 404', async () => {
      mockAxiosAdapter.onGet(ApiPaths.Offers).reply(404);
      await store.dispatch(fetchOffers());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type
      ]);
    });
  });

  describe('fetchFavoriteOffers', () => {
    it('Should dispatch "fetchFavoriteOffers.pending" and "fetchFavoriteOffers.fulfilled" with status 200', async () => {
      mockAxiosAdapter.onGet(ApiPaths.Favorite).reply(200);
      await store.dispatch(fetchFavoriteOffers());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.fulfilled.type
      ]);
    });

    it('Should dispatch "fetchFavoriteOffers.pending" and "fetchFavoriteOffers.rejected" with status 401', async () => {
      mockAxiosAdapter.onGet(ApiPaths.Favorite).reply(401);
      await store.dispatch(fetchFavoriteOffers());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.rejected.type
      ]);
    });
  });

  describe('login', () => {
    it('Should dispatch "login.pending" and "login.fulfilled" with status 200', async () => {
      const fakeUser: AuthData = {
        email: 'test@mail.com',
        password: '1234abcd',
      };
      const fakeResponse = {
        token: 'secret',
      };
      mockAxiosAdapter.onPost(ApiPaths.Login).reply(200, fakeResponse);

      await store.dispatch(login(fakeUser));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        login.pending.type,
        login.fulfilled.type
      ]);
    });

    it('should call "setToken" once with the received token', async () => {
      const fakeUser: AuthData = {
        email: 'test@mail.com',
        password: '1234abcd',
      };
      const fakeResponse = {
        token: 'secret',
      };
      mockAxiosAdapter.onPost(ApiPaths.Login).reply(200, fakeResponse);
      const mockToken = vi.spyOn(tokenStorage, 'setToken');

      await store.dispatch(login(fakeUser));

      expect(mockToken).toBeCalledTimes(1);
      expect(mockToken).toBeCalledWith(fakeResponse.token);
    });
  });

  describe('logout', () => {
    it('Should dispatch "login.pending" and "login.fulfilled" with status 200', async () => {
      mockAxiosAdapter.onDelete(ApiPaths.Logout).reply(204);

      await store.dispatch(logout());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logout.pending.type,
        logout.fulfilled.type
      ]);
    });

    it('should call "dropToken" once with the received token', async () => {
      mockAxiosAdapter.onDelete(ApiPaths.Login).reply(200);
      const mockToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logout());

      expect(mockToken).toBeCalledTimes(1);
    });
  });
});
