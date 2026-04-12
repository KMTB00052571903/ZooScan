import { AppLayout } from '../layout/AppLayout';
import { StatCard } from '../components/ui/StatCard';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { useNavigate } from 'react-router-dom';
import { useSpecies } from '../context/SpeciesContext';
import type { Species } from '../models/Species';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { setSelectedSpecies } = useSpecies();

  const handleFavoriteClick = (speciesMock: Species) => {
    setSelectedSpecies(speciesMock);
    navigate('/animal');
  };

  return (
    <AppLayout title="Profile">
      <div className="profile-container">
        
        {/* Avatar */}
        <div className="profile-avatar">U</div>

        {/* Nombre y correo */}
        <h2 className="profile-name">User</h2>
        <p className="profile-email">user@email.com</p>

        {/* Estadísticas */}
        <div className="profile-stats">
          <StatCard value="24" label="Visited" />
          <StatCard value="12" label="Favorites" />
          <StatCard value="8" label="Hours" />
        </div>

        {/* My favorites */}
        <div className="favorites-header">
          <h3 className="favorites-title">My favorites</h3>
        </div>

        {/* Lista de favoritos */}
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

        {/* Acciones */}
        <div className="profile-actions">
          <div className="action-item">
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
