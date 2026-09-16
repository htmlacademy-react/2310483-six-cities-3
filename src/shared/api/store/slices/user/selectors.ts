import { SlicesNames } from '../../../const';
import { State } from '../../store-types/store-types';

export const getAuthStatus = (state: State) => state[SlicesNames.User].authStatus;
