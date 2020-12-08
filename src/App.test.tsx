import React from 'react';
import { render, screen } from '@testing-library/react';
import App from "./App";

// TODO: change this to be more useful - but not important for now
test('should render loading screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading.../);
  expect(linkElement).toBeInTheDocument();
});
