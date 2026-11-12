import React from 'react';
import { History } from 'lucide-react';
import { PokemonDetail } from '../types/pokemon';

interface RecentHistoryBarProps {
  history: PokemonDetail[];
  currentId?: number;
  onSelect: (id: number) => void;
}

export const RecentHistoryBar: React.FC<RecentHistoryBarProps> = ({
  history,
  currentId,
  onSelect
}) => {
  if (history.length <= 1) return null;

  return (
    <div className="quick-picks" style={{ marginBottom: '1.5rem' }}>
      <span className="quick-picks-label">
        <History size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
        Explorados recentemente:
      </span>
      {history.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`quick-chip ${item.id === currentId ? 'active' : ''}`}
          onClick={() => onSelect(item.id)}
        >
          {item.formattedId} {item.name}
        </button>
      ))}
    </div>
  );
};
