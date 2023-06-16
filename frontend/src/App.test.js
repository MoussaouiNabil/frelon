import { render, screen } from '@testing-library/react';
import Appbee from './App_bee';

test('renders learn react link', () => {
  render(<Appbee/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
