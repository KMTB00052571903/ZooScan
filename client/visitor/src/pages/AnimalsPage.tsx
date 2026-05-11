import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyState } from '../components/ui/EmptyState';
import { useSpecies } from '../context/useSpecies';

type Category = 'all' | 'reptiles' | 'mammals' | 'birds';

const CATEGORIES: { key: Category; label: string; emoji: string }[] = [
  { key: 'all',      label: 'All',      emoji: '🐾' },
  { key: 'reptiles', label: 'Reptiles', emoji: '🦎' },
  { key: 'mammals',  label: 'Mammals',  emoji: '🦁' },
  { key: 'birds',    label: 'Birds',    emoji: '🦅' },
];

const CATEGORY_EMOJI: Record<string, string> = {
  reptiles: '🦎',
  mammals:  '🦁',
  birds:    '🦅',
};

export const AnimalsPage = () => {
  const navigate = useNavigate();
  const { animals, loadingAnimals, setSelectedSpecies } = useSpecies();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = activeCategory === 'all'
    ? animals
    : animals.filter(a => a.category === activeCategory);

  return (
    <AppLayout title="Animals">
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 0 1rem', overflowX: 'auto' }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                background: isActive ? 'var(--accent-primary)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loadingAnimals && <LoadingState message="Loading animals..." />}

      {!loadingAnimals && filtered.length === 0 && (
        <EmptyState
          icon={activeCategory === 'all' ? '🐾' : CATEGORY_EMOJI[activeCategory] ?? '🐾'}
          title="No animals found"
          message={activeCategory === 'all'
            ? 'No animals available yet'
            : `No ${activeCategory} in the collection yet`}
        />
      )}

      {!loadingAnimals && filtered.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '2rem' }}>
          {filtered.map(animal => (
            <div
              key={String(animal.id)}
              onClick={() => { setSelectedSpecies(animal); navigate('/animal'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'var(--bg-panel)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
            >
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>
                {CATEGORY_EMOJI[animal.category ?? ''] ?? '🐾'}
              </span>
              {animal.image_url && (
                <img
                  src={animal.image_url}
                  alt={animal.name}
                  style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>
                  {animal.name}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0', fontStyle: 'italic' }}>
                  {animal.species ?? ''}
                </p>
                {animal.danger_level && (
                  <span style={{
                    display: 'inline-block', marginTop: '4px',
                    fontSize: '11px', fontWeight: 600,
                    padding: '2px 8px', borderRadius: '10px',
                    background: animal.danger_level === 'High' ? 'rgba(239,68,68,0.15)'
                      : animal.danger_level === 'Medium' ? 'rgba(245,158,11,0.15)'
                      : 'rgba(16,185,129,0.15)',
                    color: animal.danger_level === 'High' ? '#ef4444'
                      : animal.danger_level === 'Medium' ? '#f59e0b'
                      : '#10b981',
                  }}>
                    {animal.danger_level} risk
                  </span>
                )}
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', flexShrink: 0 }}>›</span>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};
