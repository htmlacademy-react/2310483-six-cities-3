import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OfferPage from './pages/OfferPage/OfferPage';
import PrivateRoute from './shared/components/PrivateRoute/PrivateRoute';
import {AuthStatus, Paths} from './shared/api/const';
import ScrollToTop from './shared/components/ScrollToTop/ScrollToTop';


const App = () => (
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
          path={Paths.Not_Found}
          element={<NotFoundPage/>}
        />
        <Route
          path={Paths.Favorites}
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

export default App;
