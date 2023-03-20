import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('O nome correto do Pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<App />);
  const name = screen.getByText(/pikachu/i);
  expect(name).toBeInTheDocument();
});

it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<App />);
  const type = screen.queryAllByTestId('pokemon-type');
  expect(type.length).toBe(1);
  expect(type[0]).toBeInTheDocument();
  expect(type[0].innerHTML).toMatch('Electric');
});

it('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida;', () => {
  renderWithRouter(<App />);
  const weight = screen.queryAllByTestId('pokemon-weight');
  expect(weight.length).toBe(1);
  expect(weight[0]).toBeInTheDocument();
  expect(weight[0].innerHTML).toMatch('Average weight: 6.0 kg');
});

it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon.', () => {
  renderWithRouter(<App />);
  const img = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });
  expect(img).toBeInTheDocument();
  expect(img).toHaveProperty(
    'src',
    'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  );
  expect(img).toHaveProperty('alt', 'Pikachu sprite');
});

it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemon/25');
});

it('Teste se existe um ícone de estrela nos Pokémon favoritados. O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg. A imagem deve ter o atributo alt igual a <Pokemon> is marked as favorite, onde <Pokemon> é o nome do Pokémon exibido.', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(link);
  const FavoriteCheckBox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(FavoriteCheckBox);
  const icon = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveProperty('src', 'http://localhost/star-icon.svg');
  expect(icon).toHaveProperty('alt', 'Pikachu is marked as favorite');
});
