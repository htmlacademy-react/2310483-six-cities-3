import {AuthStatus, SlicesNames} from '../../../const';
import {State} from '../../store-types/store-types';
import {getAuthStatus} from './selectors';

const state: Pick<State, SlicesNames.User> = {
  [SlicesNames.User]: {
    authStatus: AuthStatus.Unknown,
  }
};

describe('User Slice Selectors', () => {
  it('Should return authStatus', () => {
    const result = getAuthStatus(state);
    expect(result).toEqual(AuthStatus.Unknown);
  });
});
