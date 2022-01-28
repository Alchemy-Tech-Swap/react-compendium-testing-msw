import { getPokemon } from '../services/api';
import { useEffect, useState } from 'react';
import PokeCard from '../components/Poke/PokeCard';
import Control from '../components/Control/Controls';

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon(query);
      setPokemon(data.results);
      setLoading(false);
    };
    if (loading) {
      fetchData();
    }
  }, [query, loading]);

  if (loading) return <h1>loading</h1>;
  return (
    <div>
      <h1>Pokedex</h1>
      <Control setLoading={setLoading} query={query} setQuery={setQuery} />
      <PokeCard pokemon={pokemon} setLoading={setLoading} />
    </div>
  );
}
