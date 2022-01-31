import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home';
import { mockPokemonList } from '../__mocks__/testData';

const server = setupServer(
  rest.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex`, (req, res, ctx) => {
    return res(ctx.json(mockPokemonList));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.listen());

test('Should render the Home page', async () => {
  render(<Home />);

  const pokeList = await screen.findAllByRole('listitem');
  expect(pokeList).toHaveLength(20);

  const heading = screen.getByRole('heading');
  expect(heading).toBeInTheDocument();

  const textBox = screen.getByRole('textbox');
  expect(textBox).toBeInTheDocument();

  const searchBtn = screen.getByRole('button');
  expect(searchBtn).toBeInTheDocument();
});

// test('Should render a Pokemon', async () => {
//   server.use(
//     rest.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex`, (req, res, ctx) => {
//       const select = req.url.searchParams.get('select');

//       if (select === '*') {
//         return res(ctx.json(user));
//       }
//       return res(ctx.status(500));
//     })
//   );
// });
