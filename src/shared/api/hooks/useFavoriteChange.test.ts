import MockAdapter from 'axios-mock-adapter';
import { api } from '../services/api';
import { State } from '../store/store-types/store-types';
import { generateOfferPreview, generateOffers } from '../../utils/mocks/fake-data';
import { ApiPaths, AuthStatus, SlicesNames } from '../const';
import { useFavoriteChange } from './useFavoriteChange';
import { renderHook } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { deleteFavoriteOffer, setFavoriteOffer } from '../store/slices/favorites/favorites-slice';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../api/hooks', () => ({
  useFavoriteChange: vi.fn(),
}));

vi.mock('../../api/store/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseAppSelector = vi.mocked(useAppSelector);
const mockedUseAppDispatch = vi.mocked(useAppDispatch);

describe('useFavoriteChange', () => {
  const mockedAxiosAdapter = new MockAdapter(api);
  const generatedOffers = generateOffers(3, true);

  it('isUpdating should be false and IsBookmarkActive is true if id is in favorite offers array', () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: null,
      },
      [SlicesNames.Offers]: {
        city: 'Paris',
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Favorites]: {
        offers: generatedOffers,
        count: 0,
        isFetching: false,
      },
    };
    const { id } = generatedOffers[0];

    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    const { result } = renderHook(() => useFavoriteChange(id));

    expect(result.current.isUpdating).toBe(false);
    expect(result.current.isBookmarkActive).toBe(true);
  });

  it('Navigate to "/login" if authStatus is "No_Auth"', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.No_Auth,
        email: null,
      },
      [SlicesNames.Offers]: {
        city: 'Paris',
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Favorites]: {
        offers: generatedOffers,
        count: 0,
        isFetching: false,
      },
    };
    const { id } = generatedOffers[0];
    const navigate = vi.fn();

    mockedUseAppSelector.mockImplementation((selector) => selector(state));
    mockedUseNavigate.mockReturnValue(navigate);

    const { result } = renderHook(() => useFavoriteChange(id));

    const response = await result.current.favoriteChangeHandler();

    expect(navigate).toHaveBeenCalledWith('/login');
    expect(response).toBeNull();
  });

  it('FavoriteChangeHandler return null with no id', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: null,
      },
      [SlicesNames.Offers]: {
        city: 'Paris',
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Favorites]: {
        offers: generatedOffers,
        count: 0,
        isFetching: false,
      },
    };
    const dispatch = vi.fn();
    mockedUseAppDispatch.mockReturnValue(dispatch);
    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    const { result } = renderHook(() => useFavoriteChange());

    await result.current.favoriteChangeHandler();

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('FavoriteChangeHandler return null with no offer with signed id', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: null,
      },
      [SlicesNames.Offers]: {
        city: 'Paris',
        offers: generatedOffers,
        isFetching: false,
      },
      [SlicesNames.Favorites]: {
        offers: generatedOffers,
        count: 0,
        isFetching: false,
      },
    };
    const id = 'fdsfdfsadasd';

    const dispatch = vi.fn();
    mockedUseAppDispatch.mockReturnValue(dispatch);
    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    const { result } = renderHook(() => useFavoriteChange(id));

    await result.current.favoriteChangeHandler();

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('FavoriteChangeHandler should be called with dispatch deleteFavoriteOffer if current offer is in favorite offers array and POST status is 200', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: null,
      },
      [SlicesNames.Offers]: {
        city: 'Paris',
        offers: generatedOffers,
        isFetching: false,
      },
      [SlicesNames.Favorites]: {
        offers: generatedOffers,
        count: 0,
        isFetching: false,
      },
    };
    const { id } = generatedOffers[0];
    const dispatch = vi.fn();
    mockedAxiosAdapter.onPost(`${ApiPaths.Favorite}/${id}/0`).reply(200);
    mockedUseAppSelector.mockImplementation((selector) => selector(state));
    mockedUseAppDispatch.mockReturnValue(dispatch);
    const { result } = renderHook(() => useFavoriteChange(id));


    await result.current.favoriteChangeHandler();

    expect(dispatch).toHaveBeenCalledWith(deleteFavoriteOffer(id));
  });

  it('FavoriteChangeHandler should be called with dispatch setFavoriteOffer if current offer is in favorite offers array and POST status is 200', async () => {
    const notFavoriteOffer = generateOfferPreview(false);
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: null,
      },
      [SlicesNames.Offers]: {
        city: 'Paris',
        offers: [
          notFavoriteOffer,
          ...generatedOffers],
        isFetching: false,
      },
      [SlicesNames.Favorites]: {
        offers: generatedOffers,
        count: 0,
        isFetching: false,
      },
    };
    const { id } = notFavoriteOffer;

    const dispatch = vi.fn();
    mockedAxiosAdapter.onPost(`${ApiPaths.Favorite}/${id}/1`).reply(200);
    mockedUseAppSelector.mockImplementation((selector) => selector(state));
    mockedUseAppDispatch.mockReturnValue(dispatch);
    const { result } = renderHook(() => useFavoriteChange(id));

    await result.current.favoriteChangeHandler();

    expect(dispatch).toHaveBeenCalledWith(setFavoriteOffer({...notFavoriteOffer, isFavorite: true}));
  });
});
