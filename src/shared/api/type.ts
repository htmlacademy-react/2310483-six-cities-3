import { OfferPreview, Comment, Offer } from './models';

export type FavoriteOffers = Map<string, OfferPreview[]>;

export type SortOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type AuthData = {
  email: string;
  password: string;
}

export type CommentData = {
  comment: string;
  rating: number | null;
}

export type OfferData = {
  offer: Offer;
  nearbyOffers: OfferPreview[];
  comments: Comment[];
}
