import { faker } from '@faker-js/faker';
import {
  Offer,
  City,
  MapLocation,
  User,
  Comment,
} from './models';
import { Cities } from './const';

const CitiesCoordinates = [
  [48.85, 2.35],
  [50.9333, 6.95],
  [50.85, 4.35],
  [52.374, 4.88969],
  [53.58, 10.02],
  [51.22, 6.78]
];

const Goods: string[] = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
];

export const generateCities = (): City[] => Cities.map((city, i) => (
  {
    name: city,
    location: {
      latitude: CitiesCoordinates[i][0],
      longitude: CitiesCoordinates[i][1],
      zoom: 13
    },
  }
));

export const generateLocation = (city: City): MapLocation => {
  const coordinates = faker.location.nearbyGPSCoordinate({
    origin: [city.location.latitude, city.location.longitude],
    radius: 1,
  });

  return (
    {
      latitude: coordinates[0],
      longitude: coordinates[1],
      zoom: 13,
    }
  );
};

export const generateUser = (isPro: boolean): User => (
  {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    isPro: isPro,
    avatar: 'markup/img/avatar-angelina.jpg',
  }
);

export const generateComment = (): Comment => (
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    user: generateUser(false),
    comment: faker.lorem.sentence(),
    rating: faker.number.int({min: 1, max: 5}),
  }
);

export const generateComments = (count: number): Comment[] => Array.from({length: count}, () => generateComment());

export const generateOffer = (city: City): Offer => (
  {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({min: 2, max: 6}),
    type: faker.datatype.boolean() ? 'Apartment' : 'Room',
    price: faker.number.int({min: 0, max: 3000}),
    city: city,
    location: generateLocation(city),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.int({min: 1, max: 5}),
    description: faker.lorem.paragraph(),
    bedrooms: faker.number.int({min: 1, max: 5}),
    goods: Array.from({length: faker.number.int({min: 1, max: 5})}, (_, i) => Goods[i]),
    host: generateUser(true),
    images: [
      'markup/img/apartment-01.jpg',
      'markup/img/apartment-02.jpg',
      'markup/img/apartment-03.jpg',
    ],
    maxAdults: faker.number.int({min: 1, max: 5}),
  }
);

export const generateOffers = (count: number): Offer[] => {
  const cities = generateCities();

  return Array.from({length: count}, () => generateOffer(cities[faker.number.int({min: 0, max: cities.length - 1})]));
};
