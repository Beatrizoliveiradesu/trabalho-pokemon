import {
  PokeApiEvolutionDetail,
  PokemonStats,
  PokemonTypeName,
  PokeApiStatEntry,
  PokeApiSprites
} from '../types/pokemon';

export const MAX_POKEMON_ID = 1025;

export const TYPE_LABELS_PT: Record<PokemonTypeName, string> = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Venenoso',
  ground: 'Terrestre',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada'
};

const ABILITY_TRANSLATIONS_PT: Record<string, string> = {
  overgrow: 'Supercrescimento',
  chlorophyll: 'Clorofila',
  blaze: 'Chama',
  'solar-power': 'Poder Solar',
  torrent: 'Torrente',
  'rain-dish': 'Cura da Chuva',
  'shield-dust': 'Pó de Escudo',
  'run-away': 'Fuga',
  'shed-skin': 'Troca de Pele',
  'compound-eyes': 'Olhos Compostos',
  'tinted-lens': 'Lente Colorida',
  swarm: 'Enxame',
  sniper: 'Franco-Atirador',
  'keen-eye': 'Olhos de Águia',
  'tangled-feet': 'Pés Confusos',
  'big-pecks': 'Peito Estufado',
  guts: 'Determinação',
  hustle: 'Entusiasmo',
  intimidate: 'Intimidação',
  unnerve: 'Tensão',
  static: 'Estática',
  'lightning-rod': 'Para-Raios',
  'sand-veil': 'Véu de Areia',
  'sand-rush': 'Ímpeto de Areia',
  'poison-point': 'Ponto Venenoso',
  rivalry: 'Rivalidade',
  'sheer-force': 'Força Bruta',
  'cute-charm': 'Charme Gracioso',
  'magic-guard': 'Guarda Mágica',
  'friend-guard': 'Guarda Amiga',
  'flash-fire': 'Fogo Fátuo',
  drought: 'Seca',
  'inner-focus': 'Foco Interno',
  infiltrator: 'Infiltrador',
  Synchronize: 'Sincronismo',
  synchronize: 'Sincronismo',
  'magic-bounce': 'Espelho Mágico',
  levitate: 'Levitação',
  'cursed-body': 'Corpo Amaldiçoado',
  pressure: 'Pressão',
  adaptability: 'Adaptabilidade',
  anticipation: 'Antecipação',
  steadfast: 'Firmeza',
  justified: 'Justiçado',
  protean: 'Mutatipo',
  'battle-bond': 'Laço de Batalha',
  multiscale: 'Multiescama',
  sturdy: 'Robustez',
  'rock-head': 'Cabeça de Pedra',
  'clear-body': 'Corpo Limpo',
  'natural-cure': 'Cura Natural',
  'serene-grace': 'Graça Serena',
  'swift-swim': 'Nado Rápido',
  'thick-fat': 'Gordura Espessa',
  immunity: 'Imunidade',
  'flame-body': 'Corpo de Chama',
  'water-absorb': 'Absorção de Água',
  'volt-absorb': 'Absorção de Volts',
  'Quick-feet': 'Pés Rápidos',
  'quick-feet': 'Pés Rápidos',
  prankster: 'Travesso',
  moxie: 'Arrogância',
  regenerator: 'Regeneração',
  'beast-boost': 'Impulso Ultracriatura'
};

const GENUS_TRANSLATIONS_PT: Record<string, string> = {
  'Seed Pokémon': 'Pokémon Semente',
  'Lizard Pokémon': 'Pokémon Lagarto',
  'Flame Pokémon': 'Pokémon Chama',
  'Tiny Turtle Pokémon': 'Pokémon Tartaruguinha',
  'Turtle Pokémon': 'Pokémon Tartaruga',
  'Shellfish Pokémon': 'Pokémon Marisco',
  'Mouse Pokémon': 'Pokémon Camundongo',
  'Shadow Pokémon': 'Pokémon Sombra',
  'Evolution Pokémon': 'Pokémon Evolução',
  'Genetic Pokémon': 'Pokémon Genético',
  'Aura Pokémon': 'Pokémon Aura',
  'Ninja Pokémon': 'Pokémon Ninja',
  'Dragon Pokémon': 'Pokémon Dragão',
  'Fairy Pokémon': 'Pokémon Fada',
  'Fox Pokémon': 'Pokémon Raposa',
  'Psi Pokémon': 'Pokémon Psíquico',
  'Sleeping Pokémon': 'Pokémon Dorminhoco',
  'Freeze Pokémon': 'Pokémon Congelante',
  'Electric Pokémon': 'Pokémon Elétrico'
};

const GENERATION_ROMAN_MAP: Record<string, string> = {
  'generation-i': '1ª Geração (Kanto)',
  'generation-ii': '2ª Geração (Johto)',
  'generation-iii': '3ª Geração (Hoenn)',
  'generation-iv': '4ª Geração (Sinnoh)',
  'generation-v': '5ª Geração (Unova)',
  'generation-vi': '6ª Geração (Kalos)',
  'generation-vii': '7ª Geração (Alola)',
  'generation-viii': '8ª Geração (Galar)',
  'generation-ix': '9ª Geração (Paldea)'
};

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(4, '0')}`;
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function translateAbilityName(rawName: string): string {
  const normalized = rawName.toLowerCase();
  return ABILITY_TRANSLATIONS_PT[normalized] ?? formatPokemonName(rawName);
}

export function translateGenus(rawGenus: string | undefined, types: PokemonTypeName[]): string {
  if (rawGenus && GENUS_TRANSLATIONS_PT[rawGenus]) {
    return GENUS_TRANSLATIONS_PT[rawGenus];
  }
  const primaryType = TYPE_LABELS_PT[types[0]] ?? 'Elemental';
  return `Pokémon do Tipo ${primaryType}`;
}

export function translateGeneration(rawGeneration: string): string {
  const normalized = rawGeneration.toLowerCase();
  return (
    GENERATION_ROMAN_MAP[normalized] ??
    rawGeneration.replace('generation-', 'Geração ').toUpperCase()
  );
}

export function buildPortugueseDescription(params: {
  name: string;
  types: PokemonTypeName[];
  generation: string;
  heightInMeters: number;
  weightInKg: number;
  isLegendary: boolean;
  isMythical: boolean;
  ptFlavorText?: string;
}): string {
  if (params.ptFlavorText) {
    return cleanFlavorText(params.ptFlavorText);
  }

  const typeLabels = params.types.map((t) => TYPE_LABELS_PT[t] ?? t);
  const typeText =
    typeLabels.length > 1
      ? `dos tipos ${typeLabels[0]} e ${typeLabels[1]}`
      : `do tipo ${typeLabels[0]}`;

  const rarityText = params.isMythical
    ? 'É classificado como uma espécie Mítica extremamente rara.'
    : params.isLegendary
      ? 'É reconhecido oficialmente como um Pokémon Lendário de alto poder.'
      : 'Destaca-se por seus atributos de combate equilibrados em batalha.';

  return `${params.name} é um Pokémon ${typeText}, catalogado originalmente na ${params.generation}. Possui estatura média de ${params.heightInMeters.toFixed(1)} m e massa corporal de ${params.weightInKg.toFixed(1)} kg. ${rarityText}`;
}

export function extractIdFromPokeApiUrl(url: string): number {
  const segments = url.replace(/\/$/, '').split('/');
  const lastSegment = segments[segments.length - 1];
  const parsed = Number.parseInt(lastSegment, 10);
  return Number.isNaN(parsed) ? 1 : parsed;
}

export function getOfficialArtworkUrl(id: number, sprites?: PokeApiSprites): string {
  const official = sprites?.other?.['official-artwork']?.front_default;
  if (official) return official;

  const home = sprites?.other?.home?.front_default;
  if (home) return home;

  const fallbackSprite = sprites?.front_default;
  if (fallbackSprite) return fallbackSprite;

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function parsePokemonStats(statsEntries: PokeApiStatEntry[]): PokemonStats {
  const statMap: Record<string, number> = {};
  for (const entry of statsEntries) {
    statMap[entry.stat.name] = entry.base_stat;
  }

  const hp = statMap['hp'] ?? 0;
  const attack = statMap['attack'] ?? 0;
  const defense = statMap['defense'] ?? 0;
  const specialAttack = statMap['special-attack'] ?? 0;
  const specialDefense = statMap['special-defense'] ?? 0;
  const speed = statMap['speed'] ?? 0;
  const total = hp + attack + defense + specialAttack + specialDefense + speed;

  return {
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total
  };
}

const ITEM_TRANSLATIONS_PT: Record<string, string> = {
  'fire-stone': 'Pedra do Fogo',
  'water-stone': 'Pedra da Água',
  'thunder-stone': 'Pedra do Trovão',
  'leaf-stone': 'Pedra da Folha',
  'moon-stone': 'Pedra da Lua',
  'sun-stone': 'Pedra do Sol',
  'shiny-stone': 'Pedra Brilhante',
  'dusk-stone': 'Pedra do Crepúsculo',
  'dawn-stone': 'Pedra da Alvorada',
  'ice-stone': 'Pedra do Gelo'
};

export function formatEvolutionTrigger(details: PokeApiEvolutionDetail[]): string | null {
  if (!details || details.length === 0) return null;
  const detail = details[0];

  if (detail.min_level) {
    return `Nível ${detail.min_level}`;
  }
  if (detail.item?.name) {
    const itemPt =
      ITEM_TRANSLATIONS_PT[detail.item.name.toLowerCase()] ??
      formatPokemonName(detail.item.name);
    return `Item: ${itemPt}`;
  }
  if (detail.min_happiness) {
    return detail.time_of_day
      ? `Felicidade (${detail.time_of_day === 'day' ? 'Dia' : 'Noite'})`
      : 'Alta Felicidade';
  }
  if (detail.trigger?.name === 'trade') {
    return 'Troca';
  }
  return 'Condição Especial';
}

export function cleanFlavorText(text: string): string {
  return text.replace(/[\f\n\r\t\v]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getRandomPokemonId(excludeId?: number): number {
  let nextId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
  if (excludeId && nextId === excludeId) {
    nextId = (nextId % MAX_POKEMON_ID) + 1;
  }
  return nextId;
}
