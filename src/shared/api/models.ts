
type OfferPreview = Omit<
  Offer,
  'description' | 'goods' | 'images' | 'host' | 'maxAdults' | 'bedrooms'
  > & {
    previewImage: string;
  };

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: PlaceLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

type City = {
  name: string;
  location: CityLocation;
};

type CityLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type PlaceLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type Host = {
  id: string;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type {OfferPreview, Offer, City, CityLocation, PlaceLocation, Host};
