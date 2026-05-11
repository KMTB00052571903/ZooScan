import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useStats } from '../context/useStats';
import { StatsCards } from '../components/StatsCards';
import { AnimalChart } from '../components/AnimalChart';
import { LiveActivityFeed } from '../components/LiveActivityFeed';
import { AnnouncementPanel } from '../components/AnnouncementPanel';
import type { ActiveVisitor } from '../types';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { stats, liveEvents, animals, loading: statsLoading, lastUpdate } = useStats();

  const handleSignOut = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="dashboard-app">
      {/* Barra superior */}
      <header className="topbar">
        <div className="topbar-brand">
          🦁 ZooControl
        </div>
        <div className="topbar-badge">
          En vivo · última actualización {formatTime(lastUpdate)}
        </div>
        <div className="topbar-right">
          <span className="topbar-user">👔 {user?.name}</span>
          <button className="signout-btn" onClick={handleSignOut}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="dashboard-main">

        {/* Tarjetas de estadísticas */}
        <StatsCards stats={stats} loading={statsLoading} />

        {/* Cuadrícula: feed en vivo + gráfico de barras */}
        <div className="dashboard-grid">
          <LiveActivityFeed events={liveEvents} />

          <div className="panel-card">
            <div className="section-title">
              <span>📈</span> Top animales más escaneados
              <span style={{
                marginLeft: 'auto',
                fontSize: '11px',
                color: 'rgba(226,238,255,0.3)',
                fontWeight: 400,
                textTransform: 'none',
                letterSpacing: 0
              }}>
                🟩 reptiles · 🟦 mamíferos · 🟨 aves
              </span>
            </div>
            <AnimalChart data={stats?.top_animals ?? []} />
          </div>
        </div>

        {/* Panel de envío de anuncios */}
        <AnnouncementPanel animals={animals} />

        {/* Visitantes activos hoy */}
        <div className="panel-card">
          <div className="section-title"><span>👥</span> Visitantes activos hoy</div>
          {!stats?.active_visitors?.length ? (
            <p style={{ color: 'rgba(226,238,255,0.3)', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
              Ningún visitante ha escaneado animales hoy aún.
            </p>
          ) : (
            <table className="visitors-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Visitante</th>
                  <th>Escaneos hoy</th>
                </tr>
              </thead>
              <tbody>
                {(stats.active_visitors as ActiveVisitor[]).map((v, i) => (
                  <tr key={v.id}>
                    <td style={{ color: 'rgba(226,238,255,0.3)', width: '40px' }}>{i + 1}</td>
                    <td>{v.name}</td>
                    <td>
                      <span style={{
                        background: 'rgba(0,119,204,0.15)',
                        border: '1px solid rgba(0,119,204,0.3)',
                        borderRadius: '6px',
                        padding: '2px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#66b8f2'
                      }}>
                        {v.scans_hoy}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </main>
    </div>
  );
};
