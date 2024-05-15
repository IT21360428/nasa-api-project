import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'fetch-mock';
import App from '../MarsRover/marsApp';

describe('App Component', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders loading state when data is being fetched', async () => {
    const { getByText } = render(<App />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches data and renders Main component with data', async () => {
    const mockData = {
      photos: [{ id: 1, img_src: 'http://example.com/image.jpg' }],
    };

    fetchMock.getOnce('*', {
      body: mockData,
      headers: { 'content-type': 'application/json' },
    });

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText('http://example.com/image.jpg')).toBeInTheDocument();
    });
  });

  test('displays search results when camera and sol are selected and Search button is clicked', async () => {
    const mockData = {
      photos: [{ id: 1, img_src: 'http://example.com/image.jpg' }],
    };

    fetchMock.getOnce('*', {
      body: mockData,
      headers: { 'content-type': 'application/json' },
    });

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(<App />);

    fireEvent.change(getByDisplayValue('Select Camera'), { target: { value: 'MAST' } });
    fireEvent.change(getByPlaceholderText('Search by sol'), { target: { value: '1000' } });
    fireEvent.click(getByText('Search'));

    await waitFor(() => {
      expect(getByText('http://example.com/image.jpg')).toBeInTheDocument();
    });
  });

});
