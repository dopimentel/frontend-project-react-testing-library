import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);
  const title = screen.getByRole('heading', {
    name: /encountered pokémon/i,
  });
  expect(title).toBeInTheDocument();
});

it('é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
  renderWithRouter(<App />);
  const nextPokeBtn = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  const prevPoke = screen.getByText(/pikachu/i);
  expect(prevPoke).toBeInTheDocument();
  userEvent.click(nextPokeBtn);
  const nextPoke = screen.getByText(/charmander/i);
  expect(nextPoke).toBeInTheDocument();
});

it('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);
  const names = screen.queryAllByTestId('pokemon-name');
  expect(names.length).toBe(1);
});

it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
  renderWithRouter(<App />);
  const btns = screen.queryAllByTestId('pokemon-type-button');
  expect(btns.length).toBe(7);
});

it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
  renderWithRouter(<App />);
  const btnEletric = screen.getByRole('button', {
    name: /electric/i,
  });
  const nextPoke = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  expect(nextPoke).not.toBeDisabled();
  userEvent.click(btnEletric);
  expect(nextPoke).toBeDisabled();
  const btnFire = screen.getByRole('button', {
    name: /fire/i,
  });
  userEvent.click(btnFire);
  expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  userEvent.click(nextPoke);
  expect(screen.getByText(/Rapidash/i)).toBeInTheDocument();
});

it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const btnAll = screen.getByRole('button', {
    name: /all/i,
  });
  expect(btnAll).toBeInTheDocument();
  const btnEletric = screen.getByRole('button', {
    name: /electric/i,
  });
  userEvent.click(btnEletric);
  const nextPoke = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  expect(nextPoke).toBeDisabled();
  userEvent.click(btnAll);
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  expect(nextPoke).not.toBeDisabled();
});
