import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyState } from '../components/ui/EmptyState';
import { useSpecies } from '../context/useSpecies';

const CATEGORY_LABEL: Record<string, string> = {
  reptiles: 'Reptiles',
  mammals:  'Mammals',
  birds:    'Birds',
};
const CATEGORY_EMOJI: Record<string, string> = {
  reptiles: '🦎',
  mammals:  '🦁',
  birds:    '🦅',
};
const DANGER_COLOR: Record<string, { bg: string; text: string }> = {
  High:   { bg: 'rgba(239,68,68,0.15)',   text: '#ef4444' },
  Medium: { bg: 'rgba(245,158,11,0.15)',  text: '#f59e0b' },
  Low:    { bg: 'rgba(16,185,129,0.15)',  text: '#10b981' },
};

export const AnimalListScreen = () => {
  const { category = 'all' } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { animals, loadingAnimals, setSelectedSpecies } = useSpecies();

  const filtered = category === 'all'
    ? animals
    : animals.filter(a => a.category === category);

  const title = CATEGORY_LABEL[category] ?? 'Animals';
  const emoji = CATEGORY_EMOJI[category] ?? '🐾';

  return (
    <AppLayout title={`${emoji} ${title}`}>
      {loadingAnimals && <LoadingState message={`Loading ${title.toLowerCase()}...`} />}

      {!loadingAnimals && filtered.length === 0 && (
        <EmptyState
          icon={emoji}
          title={`No ${title} found`}
          message="Animals will appear here once they're added to the system."
        />
      )}

      {!loadingAnimals && filtered.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '2rem' }}>
          {filtered.map(animal => {
            const dc = DANGER_COLOR[animal.danger_level ?? ''];
            const hasImage = animal.image_url != null && animal.image_url !== '';
            return (
              <div
                key={String(animal.id)}
                onClick={() => { setSelectedSpecies(animal); navigate('/animal'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px', padding: '12px 16px',
                  cursor: 'pointer', transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
              >
                {hasImage ? (
                  <img
                    src={animal.image_url}
                    alt={animal.name}
                    style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <span style={{ fontSize: '2.5rem', flexShrink: 0, width: '64px', textAlign: 'center' }}>
                    {CATEGORY_EMOJI[animal.category ?? ''] ?? '🐾'}
                  </span>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>
                    {animal.name}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0', fontStyle: 'italic' }}>
                    {animal.species ?? ''}
                  </p>
                  {dc && (
                    <span style={{
                      display: 'inline-block', marginTop: '4px',
                      fontSize: '11px', fontWeight: 600,
                      padding: '2px 8px', borderRadius: '10px',
                      background: dc.bg, color: dc.text,
                    }}>
                      {animal.danger_level} risk
                    </span>
                  )}
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', flexShrink: 0 }}>›</span>
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};
