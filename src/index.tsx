import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const data: {offersCount: number} = {
  offersCount: 5
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App data={data}/>
  </React.StrictMode>
);
