import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

it('a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);
  const titleAbout = screen.getByRole('heading', {
    name: /about pokédex/i,
    level: 2,
  });
  expect(titleAbout).toBeInTheDocument();
});

it('a página contém dois parágrafos com texto sobre a Pokédex;', () => {
  renderWithRouter(<About />);
  const paragraph1 = screen.getByText(
    /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
  );
  const paragraph2 = screen.getByText(
    /one can filter pokémon by type, and see more details for each one of them/i,
  );
  expect(paragraph1).toBeVisible();
  expect(paragraph2).toBeVisible();
});

it('a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  renderWithRouter(<About />);
  const img = screen.getByRole('img', {
    name: /pokédex/i,
  });
  expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
