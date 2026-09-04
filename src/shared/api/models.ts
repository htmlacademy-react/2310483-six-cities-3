export type OfferPreview = Omit<
  Offer,
  'description' | 'goods' | 'images' | 'host' | 'maxAdults' | 'bedrooms'
> & {
  previewImage: string;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: MapLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};

export type City = {
  name: string;
  location: MapLocation;
};

export type MapLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type User = {
  id: string;
  name: string;
  isPro: boolean;
  avatar: string;
};

export type AuthorizedUser = User & {
  token: string;
}

export type Comment = {
  id: string;
  date: Date;
  user: Omit<User, 'id'>;
  comment: string;
  rating: number;
}
