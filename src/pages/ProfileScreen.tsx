import { AppLayout } from '../layout/AppLayout';
import { StatCard } from '../components/ui/StatCard';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { useNavigate } from 'react-router-dom';
import { useSpecies } from '../context/SpeciesContext';
import { useUser } from '../context/UserContext';
import type { Species } from '../models/Species';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { setSelectedSpecies } = useSpecies();
  const { xp, level, badges, scannedAnimals } = useUser();
  const xpForNextLevel = 150;
  const xpInCurrentLevel = xp % xpForNextLevel;
  const xpPercentage = (xpInCurrentLevel / xpForNextLevel) * 100;

  const handleFavoriteClick = (speciesMock: Species) => {
    setSelectedSpecies(speciesMock);
    navigate('/animal');
  };

  return (
    <AppLayout title="Profile">
      <div className="profile-container">

        <div className="profile-avatar">U</div>
        <h2 className="profile-name">User</h2>
        <p className="profile-email">user@email.com</p>

        {/* XP Progress Bar */}
        <div className="xp-container">
          <div className="xp-header">
            <span className="xp-level">Level {level}</span>
            <span className="xp-amount">{xpInCurrentLevel} / {xpForNextLevel} XP</span>
          </div>
          <div className="xp-bar-bg">
            <div className="xp-bar-fill" style={{ width: `${xpPercentage}%` }}></div>
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
          <StatCard value={scannedAnimals.length.toString()} label="Scanned" />
          <StatCard value="12" label="Favorites" />
          <StatCard value="8" label="Hours" />
        </div>

        <div className="favorites-header">
          <h3 className="favorites-title">My favorites</h3>
        </div>
        <div className="favorites-list">
          <FavoriteCard
            name="Green iguana"
            type="Reptiles"
            emoji="🦎"
            onClick={() => handleFavoriteClick({
              id: "iguana",
              name: "Green iguana",
              habitat: "Tropical rainforest",
              dangerLevel: "Low",
              description: "The green iguana is a large, arboreal, mostly herbivorous species of lizard of the genus Iguana native to the Caribbean."
            })}
          />
          <FavoriteCard
            name="African lion"
            type="Mammals"
            emoji="🦁"
            onClick={() => handleFavoriteClick({
              id: "lion",
              name: "African lion",
              habitat: "Savannah",
              dangerLevel: "High",
              description: "The lion is a large cat of the genus Panthera native to Africa and India. It has a muscular, deep-chested body and a prominent mane."
            })}
          />
          <FavoriteCard
            name="Golden eagle"
            type="Birds"
            emoji="🦅"
            onClick={() => handleFavoriteClick({
              id: "eagle",
              name: "Golden eagle",
              habitat: "Mountains",
              dangerLevel: "Medium",
              description: "The golden eagle is a bird of prey living in the Northern Hemisphere. It is the most widely distributed species of eagle."
            })}
          />
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
