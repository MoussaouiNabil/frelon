import { render, screen } from '@testing-library/react';
import App_bee from './App_bee';

test('renders learn react link', () => {
  render(<App_bee/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
