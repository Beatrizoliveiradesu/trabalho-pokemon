import { useCallback, useEffect, useState } from 'react';
import { fetchPokemonDetail } from '../services/pokeApi';
import { PokemonDetail } from '../types/pokemon';
import { getRandomPokemonId } from '../utils/pokemonUtils';

export interface UsePokemonExplorerReturn {
  pokemon: PokemonDetail | null;
  loading: boolean;
  error: string | null;
  recentHistory: PokemonDetail[];
  searchPokemon: (query: string | number) => Promise<void>;
  triggerRandomEncounter: () => Promise<void>;
}

const INITIAL_POKEMON_ID = 6; // Charizard como vitrine inicial ou qualquer Pokémon real da PokéAPI

export function usePokemonExplorer(): UsePokemonExplorerReturn {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recentHistory, setRecentHistory] = useState<PokemonDetail[]>([]);

  const searchPokemon = useCallback(async (query: string | number) => {
    setLoading(true);
    setError(null);

    try {
      const detail = await fetchPokemonDetail(query);
      setPokemon(detail);
      setRecentHistory((prev) => {
        const filtered = prev.filter((item) => item.id !== detail.id);
        return [detail, ...filtered].slice(0, 8);
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro inesperado ao consultar a PokéAPI.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerRandomEncounter = useCallback(async () => {
    const randomId = getRandomPokemonId(pokemon?.id);
    await searchPokemon(randomId);
  }, [pokemon?.id, searchPokemon]);

  useEffect(() => {
    void searchPokemon(INITIAL_POKEMON_ID);
  }, [searchPokemon]);

  return {
    pokemon,
    loading,
    error,
    recentHistory,
    searchPokemon,
    triggerRandomEncounter
  };
}
