import { Offer } from './models';

export type FavoriteOffers = Map<string, Offer[]>;

export type SortOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
