import React from 'react';
import { AlertCircle, Flame, Loader2 } from 'lucide-react';
import { AttributesPanel } from '../components/AttributesPanel';
import { EvolutionChain } from '../components/EvolutionChain';
import { Header } from '../components/Header';
import { PokemonCard } from '../components/PokemonCard';
import { RecentHistoryBar } from '../components/RecentHistoryBar';
import { SearchBar } from '../components/SearchBar';
import { usePokemonExplorer } from '../hooks/usePokemonExplorer';

export const HomePage: React.FC = () => {
  const {
    pokemon,
    loading,
    error,
    recentHistory,
    searchPokemon,
    triggerRandomEncounter
  } = usePokemonExplorer();

  return (
    <div className="app-shell">
      <Header />

      <main className="container">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-card">
            <div className="hero-top">
              <div className="hero-copy">
                <span className="hero-eyebrow">
                  <Flame size={15} />
                  Plataforma Oficial de Exploração • PokéAPI v2
                </span>
                <h1 id="hero-title" className="hero-heading">
                  Pokémon Explorer <span>Enterprise</span>
                </h1>
                <p className="hero-description">
                  Explore o catálogo completo de Pokémon em tempo real, sorteie encontros
                  com o botão <strong>Encontro Aleatório</strong>, inspecione métricas de
                  combate (Vida, Ataque e Total Base) e descubra árvores evolutivas completas.
                </p>
              </div>
            </div>

            <SearchBar
              loading={loading}
              onSearch={searchPokemon}
              onRandomEncounter={triggerRandomEncounter}
            />
          </div>
        </section>

        <RecentHistoryBar
          history={recentHistory}
          currentId={pokemon?.id}
          onSelect={searchPokemon}
        />

        {error && (
          <div className="feedback-banner" role="alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading && !pokemon && (
          <div className="surface-card skeleton-pulse" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
            <Loader2 size={36} color="#ef4444" style={{ marginBottom: '0.75rem' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              Sincronizando dados em tempo real com a PokéAPI...
            </p>
          </div>
        )}

        {pokemon && (
          <div className={`explorer-grid ${loading ? 'skeleton-pulse' : ''}`}>
            <PokemonCard pokemon={pokemon} />

            <div className="details-column">
              <AttributesPanel pokemon={pokemon} />
              <EvolutionChain
                evolutions={pokemon.evolutions}
                currentPokemonId={pokemon.id}
                onSelectEvolution={searchPokemon}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="container footer-inner">
          <span>
            <strong>Pokémon Explorer Enterprise</strong> — Arquitetura React, Vite, TypeScript e PWA
          </span>
          <span>Dados fornecidos em tempo real pela PokéAPI (pokeapi.co)</span>
        </div>
      </footer>
    </div>
  );
};
