import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('testing homepage', () => {
  test('button in homepage redirect to create account page', () => {
    const user = userEvent.setup();
    render(
      <Router>
        <Home />
      </Router>
    );

    const startTodolistBtn = screen.getByRole('link', {
      name: /start a todolist/i,
    });
    expect(startTodolistBtn).toBeInTheDocument();
  });
});
