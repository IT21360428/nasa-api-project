import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../MarsRover/Footer';

describe('Footer Component', () => {
  test('renders without crashing and displays the correct data', () => {
    const mockData = {
      camera: {
        full_name: 'Mast Camera'
      },
      sol: 1000,
      earth_date: '2022-12-31'
    };

    const { getByText } = render(<Footer data={mockData} />);

    expect(getByText('Mast Camera')).toBeInTheDocument();
    expect(getByText('1000')).toBeInTheDocument();
    expect(getByText('2022-12-31')).toBeInTheDocument();
  });

  test('renders without crashing when data is null', () => {
    const { container } = render(<Footer data={null} />);
    expect(container).toBeInTheDocument();
  });

  test('renders without crashing when data properties are undefined', () => {
    const mockData = {};

    const { container } = render(<Footer data={mockData} />);
    expect(container).toBeInTheDocument();
  });
});
