import { CitiesNames } from './models';

export enum Paths {
  Main = '/',
  Offer = '/offer/:id',
  Login = '/login',
  Favorites = '/favorites',
  Not_Fount = '/*',
}

export enum AuthStatus {
  Auth = 'AUTH',
  No_Auth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Cities: CitiesNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum PageType {
  Main = 'main',
  Favorites = 'favorites',
  Offer = 'offer',
}
