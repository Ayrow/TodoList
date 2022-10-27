import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('testing homepage', () => {
  test('button in homepage redirect to create account page if not loggedin', async () => {
    const user = userEvent.setup();
    render(<Home />, { wrapper: Router });

    const startTodolistBtn = screen.getByRole('link', {
      name: 'Start a todolist',
    });
    expect(startTodolistBtn).toBeInTheDocument();
  });
});
