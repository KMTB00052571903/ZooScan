import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { StatCard } from '../components/ui/StatCard';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSpecies } from '../context/SpeciesContext';
import { useAuth } from '../context/AuthContext';
import { getProfile, getFavorites, type UserProfile } from '../services/api';
import type { Species } from '../models/Species';

const CATEGORY_EMOJI: Record<string, string> = {
  reptiles: '🦎',
  mammals:  '🐾',
  birds:    '🦅'
};

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { setSelectedSpecies } = useSpecies();
  const { user } = useAuth();
  const { t } = useTranslation();

  const [profile, setProfile]     = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<Species[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, favsData] = await Promise.all([
          getProfile(),
          getFavorites()
        ]);
        setProfile(profileData);
        setFavorites(favsData);
      } catch {
        setError(t('profile.errorProfile'));
      } finally {
        setLoading(false);
      }
    };
    void loadData();
  }, [t]);

  const handleFavoriteClick = (species: Species) => {
    setSelectedSpecies(species);
    navigate('/animal');
  };

  const displayName  = profile?.name  ?? user?.name  ?? 'Usuario';
  const displayEmail = profile?.email ?? '';
  const firstLetter  = displayName.charAt(0).toUpperCase();

  return (
    <AppLayout title="Profile">
      <div className="profile-container">

        <div className="profile-avatar">{firstLetter}</div>
        <h2 className="profile-name">{displayName}</h2>
        <p className="profile-email">{displayEmail}</p>

        <div className="profile-stats">
          {loading ? (
            <>
              <StatCard value="—" label={t('profile.visited')} />
              <StatCard value="—" label={t('profile.favorites')} />
              <StatCard value="—" label={t('profile.scans')} />
            </>
          ) : error ? (
            <p style={{ color: '#fca5a5', fontSize: '13px', textAlign: 'center', width: '100%' }}>
              {error}
            </p>
          ) : (
            <>
              <StatCard value={String(profile?.stats.unique_animals ?? 0)} label={t('profile.visited')} />
              <StatCard value={String(profile?.stats.favorites ?? 0)}      label={t('profile.favorites')} />
              <StatCard value={String(profile?.stats.scans_total ?? 0)}    label={t('profile.scans')} />
            </>
          )}
        </div>

        <div className="favorites-header">
          <h3 className="favorites-title">{t('profile.myFavorites')}</h3>
        </div>
        <div className="favorites-list">
          {favorites.length === 0 && !loading ? (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center', width: '100%' }}>
              {t('profile.noFavorites')}
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

        <div className="profile-actions">
          <div className="action-item" onClick={() => navigate('/edit-profile')}>
            <span>{t('profile.editProfile')}</span>
            <span className="action-arrow">›</span>
          </div>
          <div className="action-item">
            <span>{t('profile.viewHistory')}</span>
            <span className="action-arrow">›</span>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};
