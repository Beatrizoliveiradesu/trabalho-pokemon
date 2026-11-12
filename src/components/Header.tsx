import React from 'react';
import { Compass } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="brand-group">
          <div className="brand-logo" aria-hidden="true">
            <Compass size={22} color="#ef4444" />
          </div>
          <div>
            <div className="brand-title">
              Pokémon Explorer
              <span className="brand-badge">Enterprise</span>
            </div>
            <p className="brand-subtitle">
              Telemetria em Tempo Real PokéAPI v2 e Inteligência Evolutiva
            </p>
          </div>
        </div>

        <div className="header-status" title="Conectado diretamente à PokéAPI oficial">
          <span className="status-dot" />
          <span>PokéAPI Online • Pronto para PWA</span>
        </div>
      </div>
    </header>
  );
};
