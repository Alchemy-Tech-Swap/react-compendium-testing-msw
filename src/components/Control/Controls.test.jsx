import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../views/Home';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const pokemon = {
  count: 2,
  page: 1,
  perPage: 20,
  sort: {
    by: '_id',
    direction: 'asc',
  },
  search: {
    pokemon: 'blastoise',
  },
  results: [
    {
      _id: '5ff4fb7cd89993a89cc6544c',
      pokemon: 'blastoise-mega',
      id: 13,
      species_id: 9,
      height: 16,
      weight: 1011,
      base_experience: 284,
      type_1: 'water',
      type_2: 'NA',
      attack: 103,
      defense: 120,
      hp: 79,
      special_attack: 135,
      special_defense: 115,
      speed: 78,
      ability_1: 'mega-launcher',
      ability_2: 'NA',
      ability_hidden: 'NA',
      color_1: '#6890F0',
      color_2: 'NA',
      color_f: 'NA',
      egg_group_1: 'monster',
      egg_group_2: 'water1',
      url_image: 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/009_f2.png',
      generation_id: 'NA',
      evolves_from_species_id: 'NA',
      evolution_chain_id: 'NA',
      shape_id: 'NA',
      shape: 'NA',
      pokebase: 'blastoise',
      pokedex: 'http://www.pokemon.com/us/pokedex/blastoise',
    },
    {
      _id: '5ff4fb7cd89993a89cc6544b',
      pokemon: 'blastoise',
      id: 12,
      species_id: 9,
      height: 16,
      weight: 855,
      base_experience: 239,
      type_1: 'water',
      type_2: 'NA',
      attack: 83,
      defense: 100,
      hp: 79,
      special_attack: 85,
      special_defense: 105,
      speed: 78,
      ability_1: 'torrent',
      ability_2: 'NA',
      ability_hidden: 'rain-dish',
      color_1: '#6890F0',
      color_2: 'NA',
      color_f: 'NA',
      egg_group_1: 'monster',
      egg_group_2: 'water1',
      url_image: 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png',
      generation_id: 1,
      evolves_from_species_id: '8',
      evolution_chain_id: 3,
      shape_id: 6,
      shape: 'upright',
      pokebase: 'blastoise',
      pokedex: 'http://www.pokemon.com/us/pokedex/blastoise',
    },
  ],
};

const server = setupServer(
  rest.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex`, (req, res, ctx) => {
    return res(ctx.json(pokemon));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.listen());

test('should be able to search for a pokemon', async () => {
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
