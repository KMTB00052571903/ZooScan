import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import toast from 'react-hot-toast';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SectionCard } from '../components/ui/SectionCard';
import { useSpecies } from '../context/useSpecies';
import { useFavorites } from '../context/useFavorites';
import apiClient from '../services/apiClient';

// Maps qr_code_id → available GLB file in /public/models/
const MODEL_MAP: Record<string, string> = {
  'ANIMAL_IGUANA_01': '/models/iguananew.glb',
  'ANIMAL_LION_01':   '/models/lion.glb',
  'ANIMAL_EAGLE_01':  '/models/eagle.glb',
  'ANIMAL_PANDA_01':  '/models/sea_turtle.glb',
  'ANIMAL_CHIMP_01':  '/models/common_frog.glb',
  'ANIMAL_TUCAN_01':  '/models/snake_by_dino_raul.glb',
};

export const AnimalDetailScreen = () => {
  const { selectedSpecies } = useSpecies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showAR, setShowAR] = useState(false);
  const [aiFacts, setAiFacts] = useState<string[]>([]);
  const [loadingFacts, setLoadingFacts] = useState(false);

  if (!selectedSpecies) {
    return (
      <AppLayout title="Animal Detail">
        <p className="detail-empty">No animal selected</p>
      </AppLayout>
    );
  }

  const imgSrc = selectedSpecies.image_url || null;
  const glbSrc = selectedSpecies.qr_code_id
    ? MODEL_MAP[selectedSpecies.qr_code_id] ?? null
    : null;

  const generateFunFacts = async () => {
    setLoadingFacts(true);
    try {
      const { data } = await apiClient.post<{ facts: string[] }>(
        `/animals/${selectedSpecies.id}/fun-facts`
      );
      setAiFacts(data.facts);
      toast.success('Datos curiosos generados con IA ✨');
    } catch {
      toast.error('No se pudieron generar datos curiosos');
    } finally {
      setLoadingFacts(false);
    }
  };

  return (
    <AppLayout title="Animal Detail">
      <div className="detail-container">

        {/* Name + favorite toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <h1 className="detail-name">{selectedSpecies.name}</h1>
          <button
            onClick={() => {
              const adding = !isFavorite(selectedSpecies.id);
              void toggleFavorite(selectedSpecies)
                .then(() => toast.success(adding ? 'Added to favorites ❤️' : 'Removed from favorites'))
                .catch(() => toast.error('Failed to update favorites'));
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', lineHeight: 1, flexShrink: 0 }}
            aria-label={isFavorite(selectedSpecies.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(selectedSpecies.id) ? '❤️' : '🤍'}
          </button>
        </div>

        {imgSrc ? (
          <img src={imgSrc} className="detail-image" alt={selectedSpecies.name} />
        ) : (
          <div className="detail-image" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-panel)', fontSize: '5rem', borderRadius: '16px',
          }}>
            🐾
          </div>
        )}

        <p className="detail-description">{selectedSpecies.description}</p>

        {glbSrc && (
          <PrimaryButton onClick={() => setShowAR(true)}>
            🦾 View 3D Model
          </PrimaryButton>
        )}

        <SectionCard title="Habitat">{selectedSpecies.habitat}</SectionCard>
        <SectionCard title="Danger level">
          {selectedSpecies.dangerLevel ?? selectedSpecies.danger_level ?? '—'}
        </SectionCard>

        {selectedSpecies.fun_facts && selectedSpecies.fun_facts.length > 0 && (
          <SectionCard title="Fun Facts">
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {selectedSpecies.fun_facts.map((fact, i) => (
                <li key={i} style={{ marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {fact}
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {/* Botón de IA para fun facts */}
        <PrimaryButton onClick={() => void generateFunFacts()} disabled={loadingFacts}>
          {loadingFacts ? '⏳ Generando...' : '✨ Generar datos curiosos con IA'}
        </PrimaryButton>

        {aiFacts.length > 0 && (
          <SectionCard title="✨ Datos curiosos (IA)">
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {aiFacts.map((fact, i) => (
                <li key={i} style={{ marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {fact}
                </li>
              ))}
            </ul>
          </SectionCard>
        )}
      </div>

      {showAR && glbSrc && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div style={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.3rem' }}>
              🦾 {selectedSpecies.name} — 3D Model
            </h2>
            <model-viewer
              src={glbSrc}
              alt={selectedSpecies.name}
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '400px', borderRadius: '16px', background: '#1e293b' }}
            />
            <button
              onClick={() => setShowAR(false)}
              style={{
                marginTop: '1.5rem',
                padding: '12px 32px',
                borderRadius: '14px',
                background: 'var(--accent-primary)',
                color: '#fff', border: 'none',
                cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
