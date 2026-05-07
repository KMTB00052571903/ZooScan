import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { useSpecies } from '../context/SpeciesContext';
import { getFavorites, getAnimals } from '../services/api';
import type { Species } from '../models/Species';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';

const CATEGORY_EMOJI: Record<string, string> = {
  reptiles: '🦎',
  mammals:  '🐾',
  birds:    '🦅'
};

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { setSelectedSpecies } = useSpecies();
  const { t } = useTranslation();

  const [favorites, setFavorites]             = useState<Species[]>([]);
  const [categoryAnimals, setCategoryAnimals] = useState<Record<string, number>>({
    reptiles: 0, mammals: 0, birds: 0
  });

  useEffect(() => {
    getFavorites()
      .then(setFavorites)
      .catch(() => {});

    getAnimals()
      .then(animals => {
        const counts = animals.reduce((acc, a) => {
          acc[a.category] = (acc[a.category] ?? 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        setCategoryAnimals(counts);
      })
      .catch(() => {});
  }, []);

  const handleFavoriteClick = (species: Species) => {
    setSelectedSpecies(species);
    navigate('/animal');
  };

  const speciesLabel = (count: number) =>
    count ? t('home.speciesCount', { count }) : t('home.noSpecies');

  return (
    <AppLayout title="Home">
      <div className="home-container">

        <h1 className="home-title">{t('home.title')}</h1>
        <p className="home-subtitle">{t('home.subtitle')}</p>

        <div className="home-scan-card" onClick={() => navigate('/qr')}>
          <div className="home-scan-icon">
            <QrCodeIcon size={40} />
          </div>
          <div className="home-scan-text">
            <h3>{t('home.scanTitle')}</h3>
            <p>{t('home.scanSubtitle')}</p>
          </div>
        </div>

        <h2 className="categories-title">{t('home.categories')}</h2>

        <div className="category-card">
          <div className="category-icon" style={{ backgroundColor: '#418B75' }}>
            <div className="category-icon-inner"></div>
          </div>
          <div className="category-info">
            <h4>{t('home.reptiles')}</h4>
            <p>{speciesLabel(categoryAnimals.reptiles)} · {t('home.reptilesHabitat')}</p>
          </div>
        </div>

        <div className="category-card">
          <div className="category-icon" style={{ backgroundColor: '#A9D4C2' }}>
            <div className="category-icon-inner"></div>
          </div>
          <div className="category-info">
            <h4>{t('home.mammals')}</h4>
            <p>{speciesLabel(categoryAnimals.mammals)} · {t('home.mammalsHabitat')}</p>
          </div>
        </div>

        <div className="category-card">
          <div className="category-icon" style={{ backgroundColor: '#75A9EA' }}>
            <div className="category-icon-inner"></div>
          </div>
          <div className="category-info">
            <h4>{t('home.birds')}</h4>
            <p>{speciesLabel(categoryAnimals.birds)} · {t('home.birdsHabitat')}</p>
          </div>
        </div>

        <div className="favorites-header" style={{ marginTop: '1rem' }}>
          <h3 className="favorites-title">{t('home.myFavorites')}</h3>
        </div>
        <div className="favorites-list">
          {favorites.length === 0 ? (
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '13px',
              textAlign: 'center',
              width: '100%',
              padding: '8px'
            }}>
              {t('home.noFavorites')}
            </p>
          ) : (
            favorites.map(fav => (
              <FavoriteCard
                key={fav.id}
                name={fav.name}
                type={fav.category.charAt(0).toUpperCase() + fav.category.slice(1)}
                emoji={CATEGORY_EMOJI[fav.category] ?? '🐾'}
                onClick={() => handleFavoriteClick(fav)}
              />
            ))
          )}
        </div>

      </div>
    </AppLayout>
  );
};
