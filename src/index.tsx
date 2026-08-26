import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Offer, Comment } from './shared/api/models.ts';
import { generateOffers, generateComments } from './shared/api/fake-api.ts';

const OFFERS_COUNT = 20;
const COMMENTS_COUNT = 10;

const data: {
  offers: Offer[];
  comments: Comment[];
} = {
  offers: generateOffers(OFFERS_COUNT),
  comments: generateComments(COMMENTS_COUNT),
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App data={data}/>
  </React.StrictMode>
);
