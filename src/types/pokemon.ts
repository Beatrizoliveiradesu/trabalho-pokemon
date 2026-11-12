export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export interface PokeApiStatEntry {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokeApiTypeEntry {
  slot: number;
  type: {
    name: PokemonTypeName;
    url: string;
  };
}

export interface PokeApiAbilityEntry {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiSprites {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    home?: {
      front_default: string | null;
    };
    dream_world?: {
      front_default: string | null;
    };
  };
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  sprites: PokeApiSprites;
  stats: PokeApiStatEntry[];
  types: PokeApiTypeEntry[];
  abilities: PokeApiAbilityEntry[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokeApiFlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface PokeApiGenusEntry {
  genus: string;
  language: {
    name: string;
  };
}

export interface PokeApiSpeciesResponse {
  id: number;
  name: string;
  is_legendary: boolean;
  is_mythical: boolean;
  capture_rate: number;
  evolution_chain: {
    url: string;
  } | null;
  flavor_text_entries: PokeApiFlavorTextEntry[];
  genera: PokeApiGenusEntry[];
  generation: {
    name: string;
  };
}

export interface PokeApiEvolutionDetail {
  min_level: number | null;
  min_happiness: number | null;
  item: {
    name: string;
  } | null;
  trigger: {
    name: string;
  };
  time_of_day: string;
}

export interface PokeApiEvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolution_details: PokeApiEvolutionDetail[];
  evolves_to: PokeApiEvolutionChainLink[];
}

export interface PokeApiEvolutionChainResponse {
  id: number;
  chain: PokeApiEvolutionChainLink;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

export interface EvolutionNode {
  id: number;
  name: string;
  imageUrl: string;
  stage: number;
  triggerLabel: string | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  formattedId: string;
  imageUrl: string;
  shinyImageUrl: string | null;
  types: PokemonTypeName[];
  stats: PokemonStats;
  heightInMeters: number;
  weightInKg: number;
  abilities: { name: string; isHidden: boolean }[];
  description: string;
  category: string;
  generation: string;
  isLegendary: boolean;
  isMythical: boolean;
  evolutions: EvolutionNode[];
}
