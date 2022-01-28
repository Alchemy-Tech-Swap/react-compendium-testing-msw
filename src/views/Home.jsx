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
  return (
    <div>
      <h1>Pokedex</h1>
      <Control setLoading={setLoading} setQuery={setQuery} />
      <PokeCard pokemon={pokemon} setLoading={setLoading} />
    </div>
  );
}
