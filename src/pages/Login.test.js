import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../contexts/AuthContext';
import { TodolistProvider } from '../contexts/TodolistContext';
import { UserProvider } from '../contexts/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

describe('Testing the login page', () => {
  test('user can type in email input', () => {
    render(
      <AuthProvider>
        <TodolistProvider>
          <UserProvider>
            <Router>
              <Login />
            </Router>
          </UserProvider>
        </TodolistProvider>
      </AuthProvider>
    );
    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, 'aymeric@gmail.com');

    expect(emailInput).toHaveValue('aymeric@gmail.com');
  });

  test('user can type password and show/hide password', () => {
    render(
      <AuthProvider>
        <TodolistProvider>
          <UserProvider>
            <Router>
              <Login />
            </Router>
          </UserProvider>
        </TodolistProvider>
      </AuthProvider>
    );
    const passwordInput = screen.getByPlaceholderText(/your password/i);
    userEvent.type(passwordInput, 'azerty');
    expect(passwordInput).toHaveAttribute('type', 'password');

    expect(passwordInput).toHaveValue('azerty');

    const showBtn = screen.getByRole('button', {
      name: /show/i,
    });
    userEvent.click(showBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');

    userEvent.click(showBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
