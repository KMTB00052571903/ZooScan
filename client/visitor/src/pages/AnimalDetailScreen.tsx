import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import toast from 'react-hot-toast';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SectionCard } from '../components/ui/SectionCard';
import { useSpecies } from '../context/useSpecies';
import { useFavorites } from '../context/useFavorites';

const MODEL_MAP: Record<string, string> = {
  'ANIMAL_IGUANA_01': '/models/iguananew.glb',
  'ANIMAL_LION_01':   '/models/lion.glb',
  'ANIMAL_EAGLE_01':  '/models/eagle.glb',
  'ANIMAL_PANDA_01':  '/models/sea_turtle.glb',
  'ANIMAL_CHIMP_01':  '/models/common_frog.glb',
  'ANIMAL_TUCAN_01':  '/models/snake_by_dino_raul.glb',
};

const FactsList = ({ facts }: { facts: string[] }) => (
  <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
    {facts.map((fact, i) => (
      <li key={i} style={{ marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        {fact}
      </li>
    ))}
  </ul>
);

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

  const staticFacts: string[] = selectedSpecies.fun_facts ?? [];
  const allFacts: string[] = aiFacts.length > 0 ? aiFacts : staticFacts;
  const hasAiFacts = aiFacts.length > 0;

  const generateFunFacts = async () => {
    setLoadingFacts(true);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [{
            role: 'user',
            content: `Genera 3 datos curiosos sobre ${selectedSpecies.name} en español, cada uno máximo 20 palabras. Responde solo con los 3 datos, uno por línea, sin numeración.`,
          }],
          max_tokens: 200,
        }),
      });

      if (!res.ok) throw new Error(`Groq error: ${res.status}`);

      const data = await res.json() as { choices: { message: { content: string } }[] };
      const text = data.choices[0]?.message?.content ?? '';
      const facts = text.split('\n').map((l: string) => l.trim()).filter(Boolean);

      console.log('[AnimalDetail] Groq facts:', facts);

      if (facts.length > 0) {
        setAiFacts(facts);
        toast.success('Datos curiosos generados con IA ✨');
      } else {
        toast.error('El modelo no devolvió datos curiosos');
      }
    } catch (err) {
      console.error('[AnimalDetail] Groq error:', err);
      toast.error('No se pudieron generar datos curiosos');
    } finally {
      setLoadingFacts(false);
    }
  };

  return (
    <AppLayout title="Animal Detail">
      <div className="detail-container">

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

        {allFacts.length > 0 && (
          <SectionCard title={hasAiFacts ? '✨ Fun Facts (IA)' : 'Fun Facts'}>
            <FactsList facts={allFacts} />
          </SectionCard>
        )}

        <PrimaryButton onClick={() => void generateFunFacts()} disabled={loadingFacts}>
          {loadingFacts ? '⏳ Generando...' : hasAiFacts ? '🔄 Regenerar con IA' : '✨ Generar datos curiosos con IA'}
        </PrimaryButton>

      </div>

      {showAR && glbSrc && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}>
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
                marginTop: '1.5rem', padding: '12px 32px', borderRadius: '14px',
                background: 'var(--accent-primary)', color: '#fff', border: 'none',
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
