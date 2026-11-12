import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  accentColor?: string;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue = 255,
  accentColor = '#ef4444'
}) => {
  const percentage = Math.min(100, Math.round((value / maxValue) * 100));

  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <span className="stat-number">{value}</span>
      <div className="stat-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={maxValue}>
        <div
          className="stat-fill"
          style={{
            width: `${percentage}%`,
            background: accentColor
          }}
        />
      </div>
    </div>
  );
};
