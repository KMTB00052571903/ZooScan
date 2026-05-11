import { AppLayout } from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { useSpecies } from '../context/useSpecies';
import { useFavorites } from '../context/useFavorites';
import type { Species } from '../models/Species';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';

const getCategoryEmoji = (animal: Species): string => {
  if (animal.category === 'reptiles') return '🦎';
  if (animal.category === 'birds')    return '🦅';
  if (animal.category === 'mammals')  return '🦁';
  const n = animal.name.toLowerCase();
  if (n.includes('iguana'))  return '🦎';
  if (n.includes('lion'))    return '🦁';
  if (n.includes('eagle'))   return '🦅';
  if (n.includes('frog'))    return '🐸';
  if (n.includes('panda'))   return '🐼';
  if (n.includes('chimp'))   return '🐒';
  return '🐾';
};

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { setSelectedSpecies } = useSpecies();
  const { favorites, loading: favLoading } = useFavorites();

  return (
    <AppLayout title="Home">
      <div className="home-container">
        <h1 className="home-title">Explore the exhibits</h1>
        <p className="home-subtitle">
          Discover exclusive information about each exhibition
        </p>

        <div className="home-scan-card" onClick={() => navigate('/qr')}>
          <div className="home-scan-icon">
            <QrCodeIcon size={40} />
          </div>
          <div className="home-scan-text">
            <h3>Scan QR</h3>
            <p>Discover more information</p>
          </div>
        </div>

        <h2 className="categories-title">Categories</h2>

        {/* Reptiles */}
        <div className="category-card">
          <div className="category-icon" style={{ backgroundColor: '#418B75' }}>
            <div className="category-icon-inner"></div>
          </div>
          <div className="category-info">
            <h4 style={{ color: '#1B4D3E' }}>Reptiles</h4>
            <p>Discover the fascinating world of reptiles</p>
          </div>
        </div>

        {/* Mammals */}
        <div className="category-card">
          <div className="category-icon" style={{ backgroundColor: '#A9D4C2' }}>
            <div className="category-icon-inner"></div>
          </div>
          <div className="category-info">
            <h4 style={{ color: '#1B4D3E' }}>Mammals</h4>
            <p>Explore the diversity of mammals</p>
          </div>
        </div>

        {/* Birds */}
        <div className="category-card">
          <div className="category-icon" style={{ backgroundColor: '#75A9EA' }}>
            <div className="category-icon-inner"></div>
          </div>
          <div className="category-info">
            <h4 style={{ color: '#1B4D3E' }}>Birds</h4>
            <p>Meet the most incredible bird species</p>
          </div>
        </div>

        {/* My favorites */}
        <div className="favorites-header" style={{ marginTop: '1rem' }}>
          <h3 className="favorites-title">My favorites</h3>
        </div>
        <div className="favorites-list">
          {favLoading && <LoadingState message="Loading favorites..." />}
          {!favLoading && favorites.length === 0 && (
            <EmptyState icon="🤍" title="No favorites yet" message="Tap ❤️ on any animal to add it" />
          )}
          {favorites.map(animal => (
            <FavoriteCard
              key={animal.id}
              name={animal.name}
              type={animal.category ?? 'Animal'}
              emoji={getCategoryEmoji(animal)}
              onClick={() => { setSelectedSpecies(animal); navigate('/animal'); }}
            />
          ))}
        </div>

      </div>
    </AppLayout>
  );
};
