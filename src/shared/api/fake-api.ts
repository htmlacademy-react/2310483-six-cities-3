import { faker } from '@faker-js/faker';
import {
  Offer,
  City,
  mapLocation,
  User,
  Comment,
} from './models';

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

export const generateLocation = (): mapLocation => (
  {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    zoom: faker.number.int({min: 1, max: 10}),
  }
);

export const generateCity = (): City => (
  {
    name: faker.location.city(),
    location: generateLocation(),
  }
);

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

export const generateOffer = (): Offer => (
  {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({min: 2, max: 6}),
    type: faker.datatype.boolean() ? 'Apartment' : 'Room',
    price: faker.number.int({min: 0, max: 3000}),
    city: generateCity(),
    location: generateLocation(),
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

export const generateOffers = (count: number): Offer[] => Array.from({length: count}, () => generateOffer());
