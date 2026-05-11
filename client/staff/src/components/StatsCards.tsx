import type { DashboardStats } from '../types';

interface Props {
  stats: DashboardStats | null;
  loading: boolean;
}

export const StatsCards = ({ stats, loading }: Props) => {
  const val = (v: number | undefined) => loading ? '—' : (v ?? 0).toString();

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <div className="stat-value">{val(stats?.scans_today)}</div>
          <div className="stat-label">Escaneos hoy</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-info">
          <div className="stat-value">{val(stats?.unique_visitors_today)}</div>
          <div className="stat-label">Visitantes únicos hoy</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⏱️</div>
        <div className="stat-info">
          <div className="stat-value">{val(stats?.scans_last_hour)}</div>
          <div className="stat-label">Escaneos última hora</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🏆</div>
        <div className="stat-info">
          <div className="stat-value" style={{ fontSize: stats?.top_animal_today ? '16px' : '28px', paddingTop: stats?.top_animal_today ? '6px' : '0' }}>
            {loading ? '—' : (stats?.top_animal_today?.name ?? 'Sin datos')}
          </div>
          <div className="stat-label">Más popular hoy</div>
        </div>
      </div>
    </div>
  );
};
