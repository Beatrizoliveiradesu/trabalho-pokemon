import React, { useEffect, useState } from 'react';
import { Heart, Scale, Sparkles, Swords, Ruler } from 'lucide-react';
import { PokemonDetail } from '../types/pokemon';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [showShiny, setShowShiny] = useState(false);

  useEffect(() => {
    setShowShiny(false);
  }, [pokemon.id]);

  const activeImage =
    showShiny && pokemon.shinyImageUrl ? pokemon.shinyImageUrl : pokemon.imageUrl;

  return (
    <article className="surface-card pokemon-showcase" aria-label={`Detalhes de ${pokemon.name}`}>
      <div className="showcase-header">
        <div>
          <span className="pokemon-id-badge">
            {pokemon.formattedId} • {pokemon.generation}
          </span>
          <h2 className="pokemon-name-title">{pokemon.name}</h2>
          <p className="pokemon-category">
            {pokemon.category}
            {pokemon.isLegendary ? ' • Lendário' : ''}
            {pokemon.isMythical ? ' • Mítico' : ''}
          </p>
        </div>

        <div className="type-badges">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>

      <div className="artwork-stage">
        {pokemon.shinyImageUrl && (
          <button
            type="button"
            className={`shiny-toggle ${showShiny ? 'active' : ''}`}
            onClick={() => setShowShiny((prev) => !prev)}
            title="Alternar versão Brilhante (Shiny)"
          >
            <Sparkles size={14} />
            <span>{showShiny ? 'Versão Brilhante Ativa' : 'Ver Versão Brilhante'}</span>
          </button>
        )}

        <img
          src={activeImage}
          alt={`Ilustração oficial de ${pokemon.name}`}
          className="artwork-image"
          loading="eager"
        />
      </div>

      <p className="pokemon-flavor">{pokemon.description}</p>

      <div className="combat-highlights">
        <div className="metric-tile primary-metric">
          <div className="metric-icon">
            <Heart size={20} />
          </div>
          <div>
            <div className="metric-label">Pontos de Vida (HP)</div>
            <div className="metric-value">{pokemon.stats.hp}</div>
          </div>
        </div>

        <div className="metric-tile primary-metric">
          <div className="metric-icon">
            <Swords size={20} />
          </div>
          <div>
            <div className="metric-label">Ataque Base</div>
            <div className="metric-value">{pokemon.stats.attack}</div>
          </div>
        </div>

        <div className="metric-tile">
          <div className="metric-icon">
            <Ruler size={20} />
          </div>
          <div>
            <div className="metric-label">Altura</div>
            <div className="metric-value">{pokemon.heightInMeters.toFixed(1)} m</div>
          </div>
        </div>

        <div className="metric-tile">
          <div className="metric-icon">
            <Scale size={20} />
          </div>
          <div>
            <div className="metric-label">Peso</div>
            <div className="metric-value">{pokemon.weightInKg.toFixed(1)} kg</div>
          </div>
        </div>
      </div>
    </article>
  );
};
