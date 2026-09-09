export enum Paths {
  Main = '/',
  Offer = '/offer/:id',
  Login = '/login',
  Favorites = '/favorites',
  Not_Found = '/*',
}

export enum ApiPaths {
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  Offers = '/offers',
  Comments = '/comments',
}

export enum AuthStatus {
  Auth = 'AUTH',
  No_Auth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PageType {
  Main = 'main',
  Favorites = 'favorites',
  Offer = 'offer',
}

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const SHOW_ERROR_TIMEOUT = 2000 as const;
