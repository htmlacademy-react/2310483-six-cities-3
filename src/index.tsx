import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Offer, Comment } from './shared/api/models.ts';
import { generateOffers, generateComments } from './shared/api/fake-api.ts';

const OFFERS_COUNT = 4;
const COMMENTS_COUNT = 10;

const coordinates: [number, number][] = [
  [52.3909553943508, 4.85309666406198],
  [52.3609553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198]
];

const data: {
  offers: Offer[];
  comments: Comment[];
} = {
  offers: generateOffers(OFFERS_COUNT),
  comments: generateComments(COMMENTS_COUNT),
};

data.offers.forEach(({location, city}, i) => {
  location.latitude = coordinates[i][0];
  location.longitude = coordinates[i][1];
  city.location.latitude = coordinates[i][0];
  city.location.longitude = coordinates[i][1];
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App data={data}/>
  </React.StrictMode>
);
