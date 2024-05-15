import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../APOD/App';

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    const linkElement = screen.getByText(/hello, world/i);
    expect(linkElement).toBeInTheDocument();
  });
});
