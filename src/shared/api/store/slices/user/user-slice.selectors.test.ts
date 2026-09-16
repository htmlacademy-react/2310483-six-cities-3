import {AuthStatus, SlicesNames} from '../../../const';
import {State} from '../../store-types/store-types';
import {getAuthStatus, getUserEmail} from './selectors';

const state: Pick<State, SlicesNames.User> = {
  [SlicesNames.User]: {
    authStatus: AuthStatus.Auth,
    email: 'test@mail.com',
  }
};

describe('User Slice Selectors', () => {
  it('Should return authStatus', () => {
    const result = getAuthStatus(state);
    expect(result).toEqual(AuthStatus.Auth);
  });

  it('Should return email', () => {
    const result = getUserEmail(state);
    expect(result).toEqual('test@mail.com');
  });
});
