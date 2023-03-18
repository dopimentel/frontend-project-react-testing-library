import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

it('a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
it('a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', {
    name: /about/i,
  });
  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

it('a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', {
    name: /Favorite Pokémon/i,
  });
  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/pagina/naoexiste');
  });
  expect(
    screen.getByRole('heading', {
      name: /page requested not found/i,
    }),
  ).toBeDefined();
});
