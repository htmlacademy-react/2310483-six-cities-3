import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OffersPage from './pages/OfferPage/OfferPage';
import PrivateRoute from './shared/components/PrivateRoute/PrivateRoute';
import {AuthStatus, Paths} from './shared/api/const';

type AppProps = {
  data: {
    offersCount: number;
  };
}

const App = ({data}: AppProps) => (
  <body>
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Main}>
          <Route
            index
            element={
              <MainPage offersCount={data.offersCount}/>
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
              <PrivateRoute authStatus={AuthStatus.No_Auth}>
                <FavoritesPage data={1}/>
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.Offer}
            element={<OffersPage id={'1'}/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </body>
);

export default App;
