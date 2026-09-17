import { renderHook } from '@testing-library/react';
import { useAppDispatch } from '../store/hooks';
import { useLogout } from './useLogout';
import { logout } from '../store/api-action';
import { clearFavoriteOffers } from '../store/slices/favorites/favorites-slice';

vi.mock('../store/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('../store/api-action', () => ({
  logout: vi.fn(),
}));

const mockedLogout = vi.mocked(logout);
const mockedDispatch = vi.mocked(useAppDispatch);

describe('useLogout', () => {
  it('Returned function should be called with logout and clearFavoriteOffers dispatches', () => {
    const logoutThunk = vi.fn();
    const dispatch = vi.fn();
    mockedLogout.mockReturnValue(logoutThunk);
    mockedDispatch.mockReturnValue(dispatch);

    const {result} = renderHook(() => useLogout());

    result.current();

    expect(dispatch).toHaveBeenNthCalledWith(1, logoutThunk);
    expect(dispatch).toHaveBeenNthCalledWith(2, clearFavoriteOffers());
  });
});
