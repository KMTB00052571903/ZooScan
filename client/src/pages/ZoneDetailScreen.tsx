import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { ZONES } from '../data/zones';
import { ZOO_CATALOG } from '../data/animals';
import { useUser } from '../context/useUser';
import { useSpecies } from '../context/useSpecies';
import { SectionCard } from '../components/ui/SectionCard';

export const ZoneDetailScreen = () => {
  const { zoneId } = useParams();
  const navigate = useNavigate();
  const { scannedAnimals } = useUser();
  const { setSelectedSpecies } = useSpecies();
  
  const zone = ZONES.find(z => z.id === zoneId);
  const zoneAnimals = ZOO_CATALOG.filter(a => a.zoneId === zoneId);
  
  if (!zone) {
    return (
      <AppLayout title="Zone">
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p>Zone not found</p>
          <button onClick={() => navigate(-1)} className="primary-button">Back to Map</button>
        </div>
      </AppLayout>
    );
  }

  const discoveredCount = zoneAnimals.filter(a => scannedAnimals.includes(String(a.id))).length;
  const progressPercent = zoneAnimals.length > 0 ? (discoveredCount / zoneAnimals.length) * 100 : 0;

  const handleAnimalClick = (animal: typeof ZOO_CATALOG[0], isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedSpecies(animal);
      navigate('/animal');
    }
  };

  return (
    <AppLayout title={zone.name}>
      <div className="detail-container">
        {/* ✨ Zone Header */}
        <div className="zone-header" style={{ 
          background: zone.color, 
          padding: '2.5rem 1.5rem', 
          borderRadius: '24px', 
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '2rem',
          boxShadow: `0 10px 25px ${zone.color}44`
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
            {zone.emoji}
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {zone.name}
          </h1>
          {/* Subtle background decoration */}
          <div style={{ 
            position: 'absolute', 
            top: '-20px', 
            right: '-20px', 
            width: '100px', 
            height: '100px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '50%' 
          }}></div>
        </div>
        
        {/* 📊 Progress Card */}
        <div style={{ 
          background: 'var(--bg-panel)', 
          padding: '1.5rem', 
          borderRadius: '20px', 
          border: '1px solid var(--glass-border)',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Discovery Progress</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
              {discoveredCount} / {zoneAnimals.length}
            </span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.05)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              background: zone.color, 
              borderRadius: '5px',
              transition: 'width 1s ease-out'
            }}></div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
            {zone.description}
          </p>
        </div>

        {/* 🐾 Animals Grid */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.2rem', paddingLeft: '0.5rem' }}>
          Species in this area
        </h3>
        
        <div className="collection-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {zoneAnimals.map((animal) => {
            const isUnlocked = scannedAnimals.includes(String(animal.id));
            return (
              <div 
                key={animal.id} 
                className={`collection-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                onClick={() => handleAnimalClick(animal, isUnlocked)}
                style={{
                  background: isUnlocked ? 'white' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isUnlocked ? 'var(--glass-border)' : 'transparent'}`,
                  padding: '1.2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  cursor: isUnlocked ? 'pointer' : 'default',
                  transition: 'transform 0.3s ease',
                  opacity: isUnlocked ? 1 : 0.7
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem', filter: isUnlocked ? 'none' : 'grayscale(100%) blur(1px)' }}>
                  {isUnlocked ? (
                    animal.id === 'iguana' ? '🦎' : 
                    animal.id === 'lion' ? '🦁' : 
                    animal.id === 'eagle' ? '🦅' : 
                    animal.id === 'elephant' ? '🐘' : 
                    animal.id === 'penguin' ? '🐧' : 
                    animal.id === 'tiger' ? '🐅' : 
                    animal.id === 'turtle' ? '🐢' : 
                    animal.id === 'macaw' ? '🦜' : '❓'
                  ) : '❓'}
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0, color: isUnlocked ? 'var(--text-main)' : 'var(--text-muted)' }}>
                  {isUnlocked ? animal.name : '???'}
                </h4>
                {isUnlocked && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.3rem' }}>
                    {animal.habitat}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => navigate(-1)} 
          className="signout-btn" 
          style={{ 
            border: '1px solid var(--glass-border)', 
            color: 'var(--text-main)', 
            background: 'white',
            marginBottom: '2rem'
          }}
        >
          ← Back to Map
        </button>
      </div>
    </AppLayout>
  );
};
