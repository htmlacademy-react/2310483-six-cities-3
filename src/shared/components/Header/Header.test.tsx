import { useAppSelector } from '../../api/store/hooks';
import Header from './Header';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthStatus, Paths, SlicesNames } from '../../api/const';
import { State } from '../../api/store/store-types/store-types';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useLogout } from '../../api/hooks/useLogout';

vi.mock('../../api/store/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('../../api/hooks/useLogout', () => ({
  useLogout: vi.fn(),
}));

const mockedUseAppSelector = vi.mocked(useAppSelector);
const mockedUseLogout = vi.mocked(useLogout);
const mockedUseLocation = vi.mocked(useLocation);
const mockedUseNavigate = vi.mocked(useNavigate);

describe('Header', () => {
  it('Should be rendered with "sign in" button when AuthStatus.No_Auth', () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.No_Auth,
        email: 'test@mail.com',
      },
      [SlicesNames.Favorites]: {
        count: 3,
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Offers]: {
        offers: [],
        city: 'Paris',
        isFetching: false,
      },
    };

    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logo = screen.getByTestId('header-logo');
    const signInButton = screen.getByTestId('header-login');

    expect(logo).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('Should be rendered with email, favorites count and "sign out" button when AuthStatus.Auth', () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: 'test@mail.com',
      },
      [SlicesNames.Favorites]: {
        count: 3,
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Offers]: {
        offers: [],
        city: 'Paris',
        isFetching: false,
      },
    };

    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logo = screen.getByTestId('header-logo');
    const signOutButton = screen.getByText('Sign out');
    const email = screen.getByText('test@mail.com');
    const favoritesCount = screen.getByText('3');

    expect(email).toBeInTheDocument();
    expect(favoritesCount).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });

  it('Should go to "/login" by press Sign in button', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.No_Auth,
        email: 'test@mail.com',
      },
      [SlicesNames.Favorites]: {
        count: 3,
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Offers]: {
        offers: [],
        city: 'Paris',
        isFetching: false,
      },
    };
    const user = userEvent.setup();
    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<span>login</span>} />
        </Routes>
      </MemoryRouter>,
    );

    const signInButton = screen.getByTestId('header-login');

    expect(signInButton).toBeInTheDocument();

    await user.click(signInButton);

    const loginPage = screen.getByText('login');

    expect(loginPage).toBeInTheDocument();
    expect(signInButton).not.toBeInTheDocument();
  });

  it('Should go to "/favorites" by press emial', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: 'test@mail.com',
      },
      [SlicesNames.Favorites]: {
        count: 3,
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Offers]: {
        offers: [],
        city: 'Paris',
        isFetching: false,
      },
    };
    const user = userEvent.setup();
    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/favorites" element={<span>favorites</span>} />
        </Routes>
      </MemoryRouter>,
    );

    const email = screen.getByText('test@mail.com');

    expect(email).toBeInTheDocument();

    await user.click(email);

    const favoritesPage = screen.getByText('favorites');

    expect(favoritesPage).toBeInTheDocument();
    expect(email).not.toBeInTheDocument();
  });

  it('Should call logout and redirect to Main if it is Favorites page by press Sign out button', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: 'test@mail.com',
      },
      [SlicesNames.Favorites]: {
        count: 3,
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Offers]: {
        offers: [],
        city: 'Paris',
        isFetching: false,
      },
    };
    const user = userEvent.setup();
    const logout = vi.fn();
    const navigate = vi.fn();
    mockedUseNavigate.mockReturnValue(navigate);
    mockedUseLocation.mockReturnValue({
      pathname: Paths.Favorites,
      search: '',
      hash: '',
      state: '',
      key: 'default',
    });
    mockedUseAppSelector.mockImplementation((selector) => selector(state));
    mockedUseLogout.mockReturnValue(logout);
    render(
      <MemoryRouter initialEntries={[Paths.Favorites]}>
        <Routes>
          <Route path={Paths.Main} element={<span>Main</span>} />
          <Route
            path={Paths.Favorites}
            element={
              <>
                <Header />
                <span>favorites</span>
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const signOutButton = screen.getByTestId('header-logout');
    const favoritesPage = screen.getByText('favorites');
    expect(favoritesPage).toBeInTheDocument();

    await user.click(signOutButton);

    expect(logout).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(Paths.Main);
  });

  it('Should redirect to Main by press logo', async () => {
    const state: State = {
      [SlicesNames.User]: {
        authStatus: AuthStatus.Auth,
        email: 'test@mail.com',
      },
      [SlicesNames.Favorites]: {
        count: 3,
        offers: [],
        isFetching: false,
      },
      [SlicesNames.Offers]: {
        offers: [],
        city: 'Paris',
        isFetching: false,
      },
    };
    const user = userEvent.setup();
    mockedUseLocation.mockReturnValue({
      pathname: Paths.Favorites,
      search: '',
      hash: '',
      state: '',
      key: 'default',
    });
    mockedUseAppSelector.mockImplementation((selector) => selector(state));
    render(
      <MemoryRouter initialEntries={[Paths.Favorites]}>
        <Routes>
          <Route path={Paths.Main} element={<span>Main</span>} />
          <Route
            path={Paths.Favorites}
            element={
              <>
                <Header />
                <span>favorites</span>
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const logo = screen.getByTestId('header-logo');
    const favoritesPage = screen.getByText('favorites');
    expect(favoritesPage).toBeInTheDocument();

    await user.click(logo);

    const mainPage = screen.getByText('Main');
    expect(mainPage).toBeInTheDocument();
    expect(favoritesPage).not.toBeInTheDocument();
  });
});
