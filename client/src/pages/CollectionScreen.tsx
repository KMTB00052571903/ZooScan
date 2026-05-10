import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { useUser } from '../context/useUser';
import { ZOO_CATALOG } from '../data/animals';
import { ZONES } from '../data/zones';
import { useSpecies } from '../context/useSpecies';
import { useNavigate } from 'react-router-dom';

export const CollectionScreen = () => {
  const { scannedAnimals } = useUser();
  const { setSelectedSpecies } = useSpecies();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleAnimalClick = (animal: typeof ZOO_CATALOG[0], isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedSpecies(animal);
      navigate('/animal');
    }
  };

  const filteredAnimals = ZOO_CATALOG.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         animal.habitat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = !selectedZone || animal.zoneId === selectedZone;
    return matchesSearch && matchesZone;
  });

  return (
    <AppLayout title="My Collection">
      <div className="collection-container">
        <p className="collection-subtitle">
          Discover all the species in our zoo. Scanned animals: {scannedAnimals.length}/{ZOO_CATALOG.length}
        </p>

        {/* 🔍 Search and Filters Section */}
        <div className="filters-section" style={{ marginBottom: '2rem' }}>
          <div className="search-bar-wrapper" style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search animals or habitats..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none',
                backdropFilter: 'blur(10px)'
              }}
            />
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', opacity: 0.5 }}
              >
                ✕
              </button>
            )}
          </div>

          <div className="zone-filters" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
            <button 
              onClick={() => setSelectedZone(null)}
              className={`filter-chip ${selectedZone === null ? 'active' : ''}`}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                background: selectedZone === null ? 'var(--accent-primary)' : 'var(--glass-bg)',
                color: selectedZone === null ? 'white' : 'var(--text-main)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              All Zones
            </button>
            {ZONES.map(zone => (
              <button 
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`filter-chip ${selectedZone === zone.id ? 'active' : ''}`}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '20px',
                  border: '1px solid var(--glass-border)',
                  background: selectedZone === zone.id ? zone.color : 'var(--glass-bg)',
                  color: selectedZone === zone.id ? 'white' : 'var(--text-main)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{zone.emoji}</span>
                {zone.name}
              </button>
            ))}
          </div>
        </div>
        
        {filteredAnimals.length > 0 ? (
          <div className="collection-grid">
            {filteredAnimals.map((animal) => {
              const isUnlocked = scannedAnimals.includes(String(animal.id));
              return (
                <div 
                  key={animal.id} 
                  className={`collection-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                  onClick={() => handleAnimalClick(animal, isUnlocked)}
                >
                  <div className="collection-image-placeholder">
                    {isUnlocked ? (
                      <span className="collection-emoji">
                        {animal.id === 'iguana' ? '🦎' : 
                         animal.id === 'lion' ? '🦁' : 
                         animal.id === 'eagle' ? '🦅' : 
                         animal.id === 'elephant' ? '🐘' : 
                         animal.id === 'penguin' ? '🐧' : 
                         animal.id === 'tiger' ? '🐅' : 
                         animal.id === 'turtle' ? '🐢' : 
                         animal.id === 'macaw' ? '🦜' : '❓'}
                      </span>
                    ) : (
                      <span className="collection-question">?</span>
                    )}
                  </div>
                  <div className="collection-info">
                    <h4 className="collection-name">
                      {isUnlocked ? animal.name : 'Unknown Species'}
                    </h4>
                    {isUnlocked && <p className="collection-type">{animal.habitat}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Empty habitat...</p>
            <p>No animals match your search in this zone.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
