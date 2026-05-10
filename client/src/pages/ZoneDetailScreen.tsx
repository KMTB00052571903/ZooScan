import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { ZONES } from '../data/zones';
import { SectionCard } from '../components/ui/SectionCard';

export const ZoneDetailScreen = () => {
  const { zoneId } = useParams();
  const navigate = useNavigate();
  const zone = ZONES.find(z => z.id === zoneId);

  if (!zone) {
    return (
      <AppLayout title="Zona">
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p>Zona no encontrada</p>
          <button onClick={() => navigate('/map')} className="primary-button">Volver al Mapa</button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={zone.name}>
      <div className="detail-container">
        <div className="profile-avatar" style={{ background: zone.color, margin: '0 auto 1.5rem auto' }}>
          {zone.emoji}
        </div>
        
        <h1 className="detail-name" style={{ textAlign: 'center', width: '100%' }}>{zone.name}</h1>
        
        <p className="detail-description" style={{ textAlign: 'center' }}>
          {zone.description}
        </p>

        <SectionCard title="Animales en esta zona">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem' }}>
            {zone.animals.map(animal => (
              <span key={animal} style={{
                background: 'rgba(0,0,0,0.05)',
                padding: '0.4rem 0.8rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                {animal}
              </span>
            ))}
          </div>
        </SectionCard>

        <button 
          onClick={() => navigate('/map')} 
          className="signout-btn" 
          style={{ border: '1px solid var(--glass-border)', color: 'var(--text-main)', background: 'transparent' }}
        >
          Volver al Mapa
        </button>
      </div>
    </AppLayout>
  );
};
