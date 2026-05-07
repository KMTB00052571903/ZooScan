import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SectionCard } from '../components/ui/SectionCard';
import { useSpecies } from '../context/SpeciesContext';
import { addFavorite, removeFavorite, getFavorites } from '../services/api';

// Mapa de emojis de peligrosidad para el nivel de riesgo
const DANGER_COLOR: Record<string, string> = {
  Low:    '#52b788',
  Medium: '#f4a261',
  High:   '#e76f51'
};

export const AnimalDetailScreen = () => {
  const { selectedSpecies } = useSpecies();
  const [isFavorite, setIsFavorite]     = useState(false);
  const [favLoading, setFavLoading]     = useState(false);
  const [checkingFav, setCheckingFav]   = useState(true);

  // Verificar si el animal ya está en favoritos al montar
  useEffect(() => {
    if (!selectedSpecies) { setCheckingFav(false); return; }

    getFavorites()
      .then(favs => {
        setIsFavorite(favs.some(f => f.id === selectedSpecies.id));
      })
      .catch(() => { /* sin conexión: mostrar sin estado */ })
      .finally(() => setCheckingFav(false));
  }, [selectedSpecies?.id]);

  const toggleFavorite = async () => {
    if (!selectedSpecies || favLoading) return;
    setFavLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(selectedSpecies.id);
        setIsFavorite(false);
      } else {
        await addFavorite(selectedSpecies.id);
        setIsFavorite(true);
      }
    } catch {
      // Fallo silencioso — el ícono vuelve a su estado anterior
    } finally {
      setFavLoading(false);
    }
  };

  if (!selectedSpecies) {
    return (
      <AppLayout title="Animal Detail">
        <p className="detail-empty">No animal selected. Scan a QR code first.</p>
      </AppLayout>
    );
  }

  const dangerColor = DANGER_COLOR[selectedSpecies.danger_level] ?? '#52b788';

  return (
    <AppLayout title="Animal Detail">
      <div className="detail-container">

        {/* Encabezado con nombre y botón de favorito */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h1 className="detail-name" style={{ margin: 0 }}>{selectedSpecies.name}</h1>
          <button
            onClick={toggleFavorite}
            disabled={favLoading || checkingFav}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: favLoading ? 'not-allowed' : 'pointer',
              opacity: favLoading ? 0.6 : 1,
              transition: 'transform 0.2s',
              transform: isFavorite ? 'scale(1.15)' : 'scale(1)'
            }}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Nombre científico */}
        {selectedSpecies.species && (
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontStyle: 'italic', margin: '0 0 12px' }}>
            {selectedSpecies.species}
          </p>
        )}

        <img
          src={selectedSpecies.image_url}
          className="detail-image"
          alt={selectedSpecies.name}
          onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x220?text=🦎'; }}
        />

        <p className="detail-description">{selectedSpecies.description}</p>

        <PrimaryButton>View AR Model</PrimaryButton>

        <SectionCard title="Habitat">
          {selectedSpecies.habitat}
        </SectionCard>

        <SectionCard title="Danger level">
          <span style={{ color: dangerColor, fontWeight: 600 }}>
            {selectedSpecies.danger_level}
          </span>
        </SectionCard>

        {/* Fun facts — enriquecidos con la API Ninjas */}
        {selectedSpecies.fun_facts.length > 0 && (
          <SectionCard title="Fun Facts">
            <ul style={{ paddingLeft: '18px', margin: 0, lineHeight: '1.8' }}>
              {selectedSpecies.fun_facts.map((fact, i) => (
                <li key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  {fact}
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

      </div>
    </AppLayout>
  );
};
