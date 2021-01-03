import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders Hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/Der Herr der Ringe/i);
  expect(linkElement).toBeInTheDocument();
});
