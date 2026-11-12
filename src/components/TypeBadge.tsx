import React from 'react';
import { PokemonTypeName } from '../types/pokemon';
import { TYPE_LABELS_PT } from '../utils/pokemonUtils';

interface TypeBadgeProps {
  type: PokemonTypeName;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const backgroundColor = `var(--type-${type}, var(--brand-primary))`;

  return (
    <span className="type-badge" style={{ backgroundColor }}>
      {TYPE_LABELS_PT[type] ?? type}
    </span>
  );
};
