import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: change this to be more useful - but not important for now
test('renders app home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/);
  expect(linkElement).toBeInTheDocument();
});
