import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthStatus } from '../../api/const';


describe('PrivateRoute', () => {
  it('Should enter private route with AuthStatus.Auth', () => {
    const privateText = 'Только для авторизованных пользователей';

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                {privateText}
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const result = screen.getByText(privateText);

    expect(result).toBeInTheDocument();
  });

  it('Should enter private route with AuthStatus.Auth', () => {
    const privateText = 'Только для авторизованных пользователей';
    const publicText = 'Для всех';

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authStatus={AuthStatus.No_Auth}>
                {privateText}
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <span>{publicText}</span>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const result = screen.getByText(publicText);

    expect(result).toBeInTheDocument();
  });

});
