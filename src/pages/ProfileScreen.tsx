import { AppLayout } from '../layout/AppLayout';
import { StatCard } from '../components/ui/StatCard';
import { FavoriteCard } from '../components/ui/FavoriteCard';

export const ProfileScreen = () => {
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
          />
          <FavoriteCard 
            name="African lion" 
            type="Mammals" 
            emoji="🦁"
          />
          <FavoriteCard 
            name="Golden eagle" 
            type="Birds" 
            emoji="🦅"
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
