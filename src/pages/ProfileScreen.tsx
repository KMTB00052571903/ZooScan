import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { StatCard } from '../components/ui/StatCard';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { useNavigate } from 'react-router-dom';
import { useSpecies } from '../context/SpeciesContext';
import { useAuth } from '../context/AuthContext';
import { getProfile, getFavorites, type UserProfile } from '../services/api';
import type { Species } from '../models/Species';

// Emoji por categoría de animal
const CATEGORY_EMOJI: Record<string, string> = {
  reptiles: '🦎',
  mammals:  '🐾',
  birds:    '🦅'
};

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { setSelectedSpecies } = useSpecies();
  const { user } = useAuth();

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
        setError('No se pudo cargar el perfil. Verifica tu conexión.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

        {/* Estadísticas reales del backend */}
        <div className="profile-stats">
          {loading ? (
            <>
              <StatCard value="—" label="Visited" />
              <StatCard value="—" label="Favorites" />
              <StatCard value="—" label="Scans" />
            </>
          ) : error ? (
            <p style={{ color: '#fca5a5', fontSize: '13px', textAlign: 'center', width: '100%' }}>
              {error}
            </p>
          ) : (
            <>
              <StatCard value={String(profile?.stats.unique_animals ?? 0)} label="Visited" />
              <StatCard value={String(profile?.stats.favorites ?? 0)}      label="Favorites" />
              <StatCard value={String(profile?.stats.scans_total ?? 0)}    label="Scans" />
            </>
          )}
        </div>

        {/* Favoritos desde el backend */}
        <div className="favorites-header">
          <h3 className="favorites-title">My favorites</h3>
        </div>
        <div className="favorites-list">
          {favorites.length === 0 && !loading ? (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center', width: '100%' }}>
              No tienes favoritos aún. ¡Escanea un animal y márcalo con ❤️!
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
            <span>Edit profile</span>
            <span className="action-arrow">›</span>
          </div>
          <div className="action-item">
            <span>View history</span>
            <span className="action-arrow">›</span>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};
