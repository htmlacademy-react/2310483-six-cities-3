import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OffersPage from './pages/OfferPage/OfferPage';
import PrivateRoute from './shared/components/PrivateRoute/PrivateRoute';
import {AuthStatus, Paths} from './shared/api/const';
import { Offer, Comment } from './shared/api/models';
import ScrollToTop from './shared/components/ScrollToTop/ScrollToTop';

type AppProps = {
  data: {
    offers: Offer[];
    comments: Comment[];
  };
}

const App = ({data: {offers, comments}}: AppProps) => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path={Paths.Main}>
        <Route
          index
          element={
            <MainPage offers={offers}/>
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
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={Paths.Offer}
          element={<OffersPage offers={offers} comments={comments}/>}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
