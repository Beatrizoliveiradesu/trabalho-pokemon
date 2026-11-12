import React, { useState } from 'react';
import { Dices, Search } from 'lucide-react';

interface SearchBarProps {
  loading: boolean;
  onSearch: (query: string) => void;
  onRandomEncounter: () => void;
}

const FEATURED_SHORTCUTS = [
  { label: 'Charizard #0006', query: '6' },
  { label: 'Pikachu #0025', query: '25' },
  { label: 'Gengar #0094', query: '94' },
  { label: 'Eevee #0133', query: '133' },
  { label: 'Mewtwo #0150', query: '150' },
  { label: 'Lucario #0448', query: '448' },
  { label: 'Greninja #0658', query: '658' }
];

export const SearchBar: React.FC<SearchBarProps> = ({
  loading,
  onSearch,
  onRandomEncounter
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    onSearch(inputValue.trim());
  };

  return (
    <>
      <div className="controls-bar">
        <form className="search-form" onSubmit={handleSubmit} role="search">
          <Search size={19} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar Pokémon por nome ou número (ex: charizard, lucario, 25, 150)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Buscar Pokémon por nome ou número"
          />
          <button
            type="submit"
            className="btn btn-search"
            disabled={loading || !inputValue.trim()}
          >
            Buscar
          </button>
        </form>

        <button
          type="button"
          className="btn btn-random"
          onClick={onRandomEncounter}
          disabled={loading}
          title="Sortear um encontro aleatório de Pokémon"
        >
          <Dices size={20} />
          <span>Encontro Aleatório</span>
        </button>
      </div>

      <div className="quick-picks">
        <span className="quick-picks-label">Acesso rápido:</span>
        {FEATURED_SHORTCUTS.map((item) => (
          <button
            key={item.query}
            type="button"
            className="quick-chip"
            onClick={() => {
              setInputValue(item.label.split(' ')[0]);
              onSearch(item.query);
            }}
            disabled={loading}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};
