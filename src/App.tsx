import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OfferPage from './pages/OfferPage/OfferPage';
import PrivateRoute from './shared/components/PrivateRoute/PrivateRoute';
import {AuthStatus, Paths} from './shared/api/const';
import ScrollToTop from './shared/components/ScrollToTop/ScrollToTop';
import { generateOffers } from './shared/api/fake-api';
import { useEffect } from 'react';
import { useAppDispatch } from './shared/api/store/hooks';
import { offersLoaded } from './shared/api/store/action';

const OFFERS_COUNT = 30;

const fakeData = generateOffers(OFFERS_COUNT);

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(offersLoaded(fakeData));
    },
    [dispatch]
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={Paths.Main}>
          <Route
            index
            element={
              <MainPage/>
            }
          />
          <Route
            path={Paths.Login}
            element={<LoginPage/>}
          />
          <Route
            path={Paths.Not_Fount}
            element={<NotFoundPage/>}
          />
          <Route
            path='/favorites'
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.Offer}
            element={<OfferPage/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
