import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  const favoriteLink = screen.getByRole('link', {
    name: /Favorite Pokémon/i,
  });
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});
