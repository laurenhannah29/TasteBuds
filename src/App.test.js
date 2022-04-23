import React from 'react';
import {
  render, screen, test, expect,
}
  from '@testing-library/react';
import App from './App';
import EditProfile from './pages/EditProfile';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header sentence', () => {
  render(<EditProfile />);
  const linkElement = screen.getByText(/Edit profile/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders save button being on page', () => {
  render(<EditProfile />);
  const linkElement = screen.getByText(/Save/i);
  expect(linkElement).toBeInTheDocument();
});
