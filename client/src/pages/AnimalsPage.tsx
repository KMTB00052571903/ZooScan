import { AppLayout } from '../layout/AppLayout';
import { AnimalARViewer } from '../components/ui/AnimalARViewer';

const AR_ANIMALS = [
  { id: 'iguana', name: 'Green Iguana',    modelPath: '/models/iguana.glb',  emoji: '🦎' },
  { id: 'lion',   name: 'African Lion',    modelPath: '/models/lion.glb',    emoji: '🦁' },
  { id: 'eagle',  name: 'Golden Eagle',    modelPath: '/models/eagle.glb',   emoji: '🦅' },
] as const;

export const AnimalsPage = () => {
  return (
    <AppLayout title="AR Animals">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', margin: 0 }}>
          Point your camera at a flat surface, then tap the AR button to see the animal in your space.
        </p>

        {AR_ANIMALS.map(animal => (
          <div key={animal.id} style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            overflow: 'hidden',
            padding: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: '0.75rem'
            }}>
              {animal.emoji} {animal.name}
            </h3>
            <AnimalARViewer modelPath={animal.modelPath} alt={animal.name} height="320px" />
          </div>
        ))}

      </div>
    </AppLayout>
  );
};
