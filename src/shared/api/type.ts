import { OfferPreview} from './models';

export type FavoriteOffersRenderingType = Map<string, OfferPreview[]>;

export type SortOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type CommentData = {
  comment: string;
  rating: number | null;
};

export type AuthData = {
  email: string;
  password: string;
}
