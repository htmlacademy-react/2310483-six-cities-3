import { SlicesNames } from '../../../const';
import { State } from '../../store-types/store-types';

export const getAuthStatus = (state: Pick<State, SlicesNames.User>) => state[SlicesNames.User].authStatus;

export const getUserEmail = (state: Pick<State, SlicesNames.User>) => state[SlicesNames.User].email;
