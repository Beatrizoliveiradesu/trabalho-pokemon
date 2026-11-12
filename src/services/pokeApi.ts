import {
  EvolutionNode,
  PokeApiEvolutionChainLink,
  PokeApiEvolutionChainResponse,
  PokeApiPokemonResponse,
  PokeApiSpeciesResponse,
  PokemonDetail
} from '../types/pokemon';
import {
  buildPortugueseDescription,
  extractIdFromPokeApiUrl,
  formatEvolutionTrigger,
  formatPokemonId,
  formatPokemonName,
  getOfficialArtworkUrl,
  parsePokemonStats,
  translateAbilityName,
  translateGeneration,
  translateGenus
} from '../utils/pokemonUtils';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const memoryCache = new Map<string, PokemonDetail>();

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Pokémon não encontrado na PokéAPI. Verifique o nome ou número informado.');
    }
    throw new Error(`Falha na comunicação com a PokéAPI (Código HTTP ${response.status}).`);
  }
  return (await response.json()) as T;
}

function flattenEvolutionChain(
  link: PokeApiEvolutionChainLink,
  stage = 1,
  accumulator: EvolutionNode[] = []
): EvolutionNode[] {
  const id = extractIdFromPokeApiUrl(link.species.url);
  const triggerLabel = stage === 1 ? 'Forma Base' : formatEvolutionTrigger(link.evolution_details);

  accumulator.push({
    id,
    name: formatPokemonName(link.species.name),
    imageUrl: getOfficialArtworkUrl(id),
    stage,
    triggerLabel
  });

  for (const nextLink of link.evolves_to) {
    flattenEvolutionChain(nextLink, stage + 1, accumulator);
  }

  return accumulator;
}

export async function fetchPokemonDetail(identifier: string | number): Promise<PokemonDetail> {
  const normalizedQuery = String(identifier).trim().toLowerCase().replace(/^#/, '');
  if (!normalizedQuery) {
    throw new Error('Digite o nome ou o número de um Pokémon para realizar a busca.');
  }

  const cached = memoryCache.get(normalizedQuery);
  if (cached) {
    return cached;
  }

  const pokemonData = await fetchJson<PokeApiPokemonResponse>(
    `${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(normalizedQuery)}`
  );

  const speciesId = extractIdFromPokeApiUrl(pokemonData.species.url);
  const speciesData = await fetchJson<PokeApiSpeciesResponse>(
    `${POKEAPI_BASE_URL}/pokemon-species/${speciesId}`
  );

  let evolutions: EvolutionNode[] = [];
  if (speciesData.evolution_chain?.url) {
    try {
      const evolutionData = await fetchJson<PokeApiEvolutionChainResponse>(
        speciesData.evolution_chain.url
      );
      evolutions = flattenEvolutionChain(evolutionData.chain);
    } catch {
      evolutions = [
        {
          id: pokemonData.id,
          name: formatPokemonName(pokemonData.name),
          imageUrl: getOfficialArtworkUrl(pokemonData.id, pokemonData.sprites),
          stage: 1,
          triggerLabel: 'Forma Base'
        }
      ];
    }
  }

  const ptFlavorEntry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === 'pt-BR' || entry.language.name === 'pt'
  );

  const ptGenusEntry = speciesData.genera.find(
    (entry) => entry.language.name === 'pt-BR' || entry.language.name === 'pt'
  );
  const enGenusEntry = speciesData.genera.find((entry) => entry.language.name === 'en');

  const formattedName = formatPokemonName(pokemonData.name);
  const types = pokemonData.types.map((t) => t.type.name);
  const heightInMeters = pokemonData.height / 10;
  const weightInKg = pokemonData.weight / 10;
  const generation = translateGeneration(speciesData.generation.name);

  const detail: PokemonDetail = {
    id: pokemonData.id,
    name: formattedName,
    formattedId: formatPokemonId(pokemonData.id),
    imageUrl: getOfficialArtworkUrl(pokemonData.id, pokemonData.sprites),
    shinyImageUrl:
      pokemonData.sprites.other?.['official-artwork']?.front_shiny ??
      pokemonData.sprites.front_shiny ??
      null,
    types,
    stats: parsePokemonStats(pokemonData.stats),
    heightInMeters,
    weightInKg,
    abilities: pokemonData.abilities.map((item) => ({
      name: translateAbilityName(item.ability.name),
      isHidden: item.is_hidden
    })),
    description: buildPortugueseDescription({
      name: formattedName,
      types,
      generation,
      heightInMeters,
      weightInKg,
      isLegendary: speciesData.is_legendary,
      isMythical: speciesData.is_mythical,
      ptFlavorText: ptFlavorEntry?.flavor_text
    }),
    category: ptGenusEntry
      ? ptGenusEntry.genus
      : translateGenus(enGenusEntry?.genus, types),
    generation,
    isLegendary: speciesData.is_legendary,
    isMythical: speciesData.is_mythical,
    evolutions
  };

  memoryCache.set(String(detail.id), detail);
  memoryCache.set(pokemonData.name.toLowerCase(), detail);

  return detail;
}
