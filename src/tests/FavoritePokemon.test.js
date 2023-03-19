import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
  const { history } = renderWithRouter(<App />);
  const favoriteLink = screen.getByRole('link', {
    name: /Favorite Pokémon/i,
  });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);
  expect(screen.getByText(/no favorite pokémon found/i)).toBeInTheDocument();
  act(() => {
    history.push('/pokemon/25');
  });
  const favoriteInput = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(favoriteInput);
  userEvent.click(favoriteLink);
  const poke = screen.getByText(/pikachu/i);
  expect(poke).toBeInTheDocument();
});
