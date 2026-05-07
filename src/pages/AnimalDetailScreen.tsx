import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SectionCard } from '../components/ui/SectionCard';
import { useTranslation } from 'react-i18next';
import { useSpecies } from '../context/SpeciesContext';
import { addFavorite, removeFavorite, getFavorites } from '../services/api';

const DANGER_COLOR: Record<string, string> = {
  Low:    '#52b788',
  Medium: '#f4a261',
  High:   '#e76f51'
};

export const AnimalDetailScreen = () => {
  const { selectedSpecies } = useSpecies();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite]   = useState(false);
  const [favLoading, setFavLoading]   = useState(false);
  const [checkingFav, setCheckingFav] = useState(true);

  useEffect(() => {
    if (!selectedSpecies) { setCheckingFav(false); return; }

    getFavorites()
      .then(favs => {
        setIsFavorite(favs.some(f => f.id === selectedSpecies.id));
      })
      .catch(() => {})
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
      // silent — icon reverts
    } finally {
      setFavLoading(false);
    }
  };

  if (!selectedSpecies) {
    return (
      <AppLayout title="Animal Detail">
        <p className="detail-empty">{t('animal.noSelection')}</p>
      </AppLayout>
    );
  }

  const dangerColor = DANGER_COLOR[selectedSpecies.danger_level] ?? '#52b788';

  return (
    <AppLayout title="Animal Detail">
      <div className="detail-container">

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
            title={isFavorite ? t('animal.removeFavorite') : t('animal.addFavorite')}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

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

        <PrimaryButton>{t('animal.viewAR')}</PrimaryButton>

        <SectionCard title={t('animal.habitat')}>
          {selectedSpecies.habitat}
        </SectionCard>

        <SectionCard title={t('animal.dangerLevel')}>
          <span style={{ color: dangerColor, fontWeight: 600 }}>
            {selectedSpecies.danger_level}
          </span>
        </SectionCard>

        {selectedSpecies.fun_facts.length > 0 && (
          <SectionCard title={t('animal.funFacts')}>
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
