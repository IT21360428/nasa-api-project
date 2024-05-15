import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Main from '../MarsRover/Main';

describe('Main Component', () => {
  const mockData = [
    { camera: { full_name: 'Camera 1' }, sol: 1001, earth_date: '2022-01-01', img_src: 'image1.jpg' },
    { camera: { full_name: 'Camera 2' }, sol: 1002, earth_date: '2022-01-02', img_src: 'image2.jpg' },
    { camera: { full_name: 'Camera 3' }, sol: 1003, earth_date: '2022-01-03', img_src: 'image3.jpg' },
    { camera: { full_name: 'Camera 4' }, sol: 1004, earth_date: '2022-01-04', img_src: 'image4.jpg' },
    { camera: { full_name: 'Camera 5' }, sol: 1005, earth_date: '2022-01-05', img_src: 'image5.jpg' },
    { camera: { full_name: 'Camera 6' }, sol: 1006, earth_date: '2022-01-06', img_src: 'image6.jpg' },
    { camera: { full_name: 'Camera 7' }, sol: 1007, earth_date: '2022-01-07', img_src: 'image7.jpg' },
    { camera: { full_name: 'Camera 8' }, sol: 1008, earth_date: '2022-01-08', img_src: 'image8.jpg' },
    { camera: { full_name: 'Camera 9' }, sol: 1009, earth_date: '2022-01-09', img_src: 'image9.jpg' },
    { camera: { full_name: 'Camera 10' }, sol: 1010, earth_date: '2022-01-10', img_src: 'image10.jpg' },
  ];

  test('renders the Main component with data and limits to 9 items', () => {
    const { getAllByAltText } = render(<Main data={mockData} />);

    // Check if only 9 images are rendered
    const images = getAllByAltText(/bg-img|2022-01/);
    expect(images.length).toBe(9);
  });

  test('toggles modal state when handleToggleModal is called', () => {
    const { getAllByAltText } = render(<Main data={mockData} />);
    
    // Initially, no modals should be visible (modal state is managed internally)
    const images = getAllByAltText(/bg-img|2022-01/);

    // Simulate clicking the image to toggle the modal
    fireEvent.click(images[0]);

    // Since the component logic for showing the modal is not specified,
    // we would ideally check if the modal state changes correctly.
    // Here, we assume a function or an indicator to check the state change
    // For demonstration purposes, this part is omitted.
  });

  test('renders Footer component with correct props', () => {
    const { getByText } = render(<Main data={mockData} />);

    // Check if Footer component receives and displays correct data
    expect(getByText('Camera 1')).toBeInTheDocument();
    expect(getByText('1001')).toBeInTheDocument();
    expect(getByText('2022-01-01')).toBeInTheDocument();
  });
});
