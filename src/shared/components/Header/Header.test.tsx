import { useAppSelector } from '../../api/store/hooks';
import Header from './Header';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthStatus, SlicesNames } from '../../api/const';
import { State } from '../../api/store/store-types/store-types';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../api/store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
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
      }
    };

    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    render(
      <MemoryRouter>
        <Header/>
      </MemoryRouter>
    );

    const logo = screen.getByTestId('header-logo');
    const signInButton = screen.getByText('Sign in');

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
      }
    };

    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    render(
      <MemoryRouter>
        <Header/>
      </MemoryRouter>
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
});
