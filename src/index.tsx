import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './shared/api/store/store.ts';
import { fetchOffers, checkAuth, fetchFavoriteOffers } from './shared/api/store/api-action.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuth());
store.dispatch(fetchOffers());
store.dispatch(fetchFavoriteOffers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
