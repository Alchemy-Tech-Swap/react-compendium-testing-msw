import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../views/Home';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockPokemon } from '../../__mocks__/testData';

const server = setupServer(
  rest.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex`, (req, res, ctx) => {
    return res(ctx.json(mockPokemon));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.listen());

test.skip('should be able to search for a pokemon', async () => {
  render(<Home />);

  const searchBar = await screen.findByRole('textbox');
  const pokeName = 'blastoise';
  const searchButton = screen.getByRole('button');

  userEvent.type(searchBar, pokeName);
  userEvent.click(searchButton);

  const poke = await screen.findAllByText(pokeName, { exact: false });

  const res = poke.map((item) => item.textContent);

  const handleName = (name) => name.toLowerCase().includes(pokeName);
  const sameName = res.every(handleName);
  expect(sameName).toBe(true);
});
