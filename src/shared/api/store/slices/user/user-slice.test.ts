import { AuthStatus } from '../../../const';
import { checkAuth, login, logout } from '../../api-action';
import { UserData } from '../../store-types/store-types';
import { userSlice } from './user-slice';

describe('User Slice', () => {
  it('Should return initial state with an empty action', () => {
    const expectedState: UserData = {
      authStatus: AuthStatus.Unknown,
    };

    const emptyAction = {
      type: '',
    };

    const result = userSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with an empty action', () => {
    const expectedState: UserData = {
      authStatus: AuthStatus.Unknown,
    };

    const emptyAction = {
      type: '',
    };

    const result = userSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should set authStatus "AuthStatus.Auth" with action checkAuth.fulfilled', () => {
    const expectedState: UserData = {
      authStatus: AuthStatus.Auth,
    };

    const result = userSlice.reducer(undefined, checkAuth.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('Should set authStatus "AuthStatus.No_Auth" with action checkAuth.fulfilled', () => {
    const expectedState: UserData = {
      authStatus: AuthStatus.No_Auth,
    };

    const result = userSlice.reducer(undefined, checkAuth.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should set authStatus "AuthStatus.Auth" with action login.fulfilled', () => {
    const expectedState: UserData = {
      authStatus: AuthStatus.Auth,
    };

    const result = userSlice.reducer(undefined, login.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('Should set authStatus "AuthStatus.No_Auth" with action login.fulfilled', () => {
    const expectedState: UserData = {
      authStatus: AuthStatus.No_Auth,
    };

    const result = userSlice.reducer(undefined, login.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should set authStatus "AuthStatus.No_Auth" with action logout.fulfilled', () => {
    const expectedState: UserData = {
      authStatus: AuthStatus.No_Auth,
    };

    const result = userSlice.reducer(undefined, logout.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
