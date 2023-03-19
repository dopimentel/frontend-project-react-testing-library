import React from 'react';
import { act, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('a página contém um heading h2 com o texto Page requested not found e se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/pagina/naoexiste');
  });
  const title = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });
  const img = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  expect(title).toBeDefined();
  expect(img).toHaveProperty(
    'src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
