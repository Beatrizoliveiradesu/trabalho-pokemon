import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import { PokemonDetail } from '../types/pokemon';
import { StatBar } from './StatBar';

interface AttributesPanelProps {
  pokemon: PokemonDetail;
}

export const AttributesPanel: React.FC<AttributesPanelProps> = ({ pokemon }) => {
  const { stats, abilities } = pokemon;

  return (
    <section className="surface-card" aria-labelledby="attributes-heading">
      <div className="section-header">
        <h3 id="attributes-heading" className="section-title">
          <Activity size={20} />
          <span>Matriz de Atributos Base</span>
        </h3>
        <span className="pokemon-id-badge">Total Base: {stats.total} pts</span>
      </div>

      <div className="stats-list">
        <StatBar label="Vida (HP)" value={stats.hp} accentColor="#22c55e" />
        <StatBar label="Ataque" value={stats.attack} accentColor="#ef4444" />
        <StatBar label="Defesa" value={stats.defense} accentColor="#f59e0b" />
        <StatBar label="Atq. Especial" value={stats.specialAttack} accentColor="#3b82f6" />
        <StatBar label="Def. Especial" value={stats.specialDefense} accentColor="#8b5cf6" />
        <StatBar label="Velocidade" value={stats.speed} accentColor="#ec4899" />
      </div>

      <div className="abilities-row">
        <span className="quick-picks-label">
          <ShieldAlert size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          Habilidades:
        </span>
        {abilities.map((ability) => (
          <span key={ability.name} className="ability-tag">
            {ability.name} {ability.isHidden ? '(Oculta)' : ''}
          </span>
        ))}
      </div>
    </section>
  );
};
