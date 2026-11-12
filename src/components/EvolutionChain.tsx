import React from 'react';
import { ArrowRight, GitBranch } from 'lucide-react';
import { EvolutionNode } from '../types/pokemon';
import { formatPokemonId } from '../utils/pokemonUtils';

interface EvolutionChainProps {
  evolutions: EvolutionNode[];
  currentPokemonId: number;
  onSelectEvolution: (id: number) => void;
}

export const EvolutionChain: React.FC<EvolutionChainProps> = ({
  evolutions,
  currentPokemonId,
  onSelectEvolution
}) => {
  return (
    <section className="surface-card" aria-labelledby="evolution-heading">
      <div className="section-header">
        <h3 id="evolution-heading" className="section-title">
          <GitBranch size={20} />
          <span>Árvore Evolutiva</span>
        </h3>
        <span className="brand-subtitle">
          {evolutions.length} {evolutions.length === 1 ? 'estágio' : 'estágios'}
        </span>
      </div>

      <div className="evolution-chain-grid">
        {evolutions.map((node, index) => {
          const isCurrent = node.id === currentPokemonId;

          return (
            <div key={node.id} className="evolution-step">
              {index > 0 && (
                <ArrowRight size={18} className="evolution-arrow" aria-hidden="true" />
              )}

              <button
                type="button"
                className={`evolution-node-btn ${isCurrent ? 'current' : ''}`}
                onClick={() => onSelectEvolution(node.id)}
                aria-current={isCurrent ? 'true' : undefined}
              >
                <img
                  src={node.imageUrl}
                  alt={node.name}
                  className="evolution-thumb"
                  loading="lazy"
                />
                <span className="evolution-id">{formatPokemonId(node.id)}</span>
                <span className="evolution-name">{node.name}</span>
                {node.triggerLabel && (
                  <span className="evolution-trigger">{node.triggerLabel}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
