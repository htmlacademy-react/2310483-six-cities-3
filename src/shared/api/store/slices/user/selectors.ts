import { SlicesNames } from '../../../const';
import { State } from '../../store-types/type';

export const getAuthStatus = (state: State) => state[SlicesNames.User].authStatus;
