import { AppLayout } from '../layout/AppLayout';
import { StatCard } from '../components/ui/StatCard';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyState } from '../components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useUser } from '../context/useUser';
import { useSpecies } from '../context/useSpecies';
import { useFavorites } from '../context/useFavorites';

const CATEGORY_EMOJI: Record<string, string> = {
  reptiles: '🦎', mammals: '🦁', birds: '🦅',
};

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { email, xp, level, scannedAnimals, badges } = useUser();
  const { setSelectedSpecies } = useSpecies();
  const { favorites, loading: favLoading } = useFavorites();

  const displayName = user?.name ?? 'User';
  const avatarLetter = displayName.charAt(0).toUpperCase() || 'U';

  const xpForNextLevel = 150;
  const xpInCurrentLevel = xp % xpForNextLevel;
  const xpPercentage = (xpInCurrentLevel / xpForNextLevel) * 100;

  return (
    <AppLayout title="Profile">
      <div className="profile-container">

        <div className="profile-avatar">{avatarLetter}</div>
        <h2 className="profile-name">{displayName}</h2>
        <p className="profile-email">{email || '—'}</p>

        {/* XP Progress */}
        <div className="xp-container">
          <div className="xp-header">
            <span className="xp-level">Level {level}</span>
            <span className="xp-amount">{xpInCurrentLevel} / {xpForNextLevel} XP</span>
          </div>
          <div className="xp-bar-bg">
            <div className="xp-bar-fill" style={{ width: `${xpPercentage}%` }} />
          </div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div style={{ width: '100%', marginBottom: '1rem' }}>
            <h3 className="favorites-title" style={{ marginBottom: '0.75rem' }}>My Badges</h3>
            <div className="badges-container">
              {badges.map(badge => (
                <div key={badge} className="badge">{badge}</div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="profile-stats">
          <StatCard value={String(scannedAnimals.length)} label="Scanned" />
          <StatCard value={String(favorites.length)} label="Favorites" />
          <StatCard value={String(level)} label="Level" />
        </div>

        {/* Favorites list */}
        <div className="favorites-header">
          <h3 className="favorites-title">My favorites</h3>
        </div>
        <div className="favorites-list">
          {favLoading && <LoadingState message="Loading favorites..." />}
          {!favLoading && favorites.length === 0 && (
            <EmptyState icon="🤍" title="No favorites yet" message="Tap ❤️ on any animal to add it" />
          )}
          {favorites.map(animal => (
            <FavoriteCard
              key={String(animal.id)}
              name={animal.name}
              type={animal.category ?? 'Animal'}
              emoji={CATEGORY_EMOJI[animal.category ?? ''] ?? '🐾'}
              onClick={() => { setSelectedSpecies(animal); navigate('/animal'); }}
            />
          ))}
        </div>

        {/* Actions */}
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
