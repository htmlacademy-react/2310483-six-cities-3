import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, SlicesNames } from '../../../const';
import { UserData } from '../../store-types/store-types';
import { checkAuth, login, logout } from '../../api-action';

const initialState: UserData = {
  authStatus: AuthStatus.Unknown,
  email: null,
};

export const userSlice = createSlice({
  name: SlicesNames.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.authStatus = AuthStatus.Auth;
        state.email = payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.No_Auth;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.authStatus = AuthStatus.Auth;
        state.email = payload;
      })
      .addCase(login.rejected, (state) => {
        state.authStatus = AuthStatus.No_Auth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authStatus = AuthStatus.No_Auth;
        state.email = null;
      });
  }
});
