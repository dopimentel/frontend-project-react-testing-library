import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon. Não deve existir o link de navegação para os detalhes do Pokémon selecionado.', () => {
  renderWithRouter(<App />);
  const link = screen.queryByRole('link', {
    name: /more details/i,
  });
  userEvent.click(link);

  const pokeDetails = screen.getByRole('heading', {
    name: /pikachu details/i,
    level: 2,
  });
  expect(pokeDetails).toBeInTheDocument();
  expect(link).not.toBeInTheDocument();
});

it('A seção de detalhes deve conter um heading h2 com o texto Summary. A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
  renderWithRouter(<App />);
  const link = screen.queryByRole('link', {
    name: /more details/i,
  });
  userEvent.click(link);

  const summary = screen.getByRole('heading', {
    name: /summary/i,
  });
  expect(summary).toBeVisible();
  const paragraph = screen.getByText(
    /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
  );
  expect(paragraph).toBeInTheDocument();
});

it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido. Todas as localizações do Pokémon devem ser mostradas na seção de detalhes. A imagem da localização deve ter um atributo src com a URL da localização. A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.', () => {
  renderWithRouter(<App />);
  const link = screen.queryByRole('link', {
    name: /more details/i,
  });
  userEvent.click(link);
  expect(
    screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();

  const imgs = screen.queryAllByAltText('Pikachu location');
  expect(imgs.length).not.toBe(0);
  expect(imgs[0]).toHaveProperty(
    'src',
    'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
  );
});

it('A página deve exibir um checkbox que permite favoritar o Pokémon. Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos.O label do checkbox deve conter o texto Pokémon favoritado?.', () => {
  renderWithRouter(<App />);
  const link = screen.queryByRole('link', {
    name: /more details/i,
  });
  userEvent.click(link);
  const FavoriteCheckBox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  expect(FavoriteCheckBox).toBeInTheDocument();
  userEvent.click(FavoriteCheckBox);
  const icon = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(icon).toBeInTheDocument();
  userEvent.click(FavoriteCheckBox);
  expect(icon).not.toBeInTheDocument();
});
