import { AppLayout } from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { useSpecies } from '../context/useSpecies';
import { useFavorites } from '../context/useFavorites';
import type { Species } from '../models/Species';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';

const CATEGORY_EMOJI: Record<string, string> = {
  reptiles: '🦎', mammals: '🦁', birds: '🦅',
};

const getCategoryEmoji = (animal: Species): string => {
  if (animal.category) return CATEGORY_EMOJI[animal.category] ?? '🐾';
  const n = animal.name.toLowerCase();
  if (n.includes('iguana') || n.includes('snake') || n.includes('frog')) return '🦎';
  if (n.includes('lion') || n.includes('panda') || n.includes('chimp')) return '🦁';
  if (n.includes('eagle') || n.includes('toucan') || n.includes('bird')) return '🦅';
  return '🐾';
};

const CATEGORIES = [
  { key: 'reptiles', label: 'Reptiles', emoji: '🦎', color: '#418B75', bg: 'rgba(65,139,117,0.12)', desc: 'Discover the fascinating world of reptiles' },
  { key: 'mammals',  label: 'Mammals',  emoji: '🦁', color: '#A07850', bg: 'rgba(160,120,80,0.12)',  desc: 'Explore the diversity of mammals' },
  { key: 'birds',    label: 'Birds',    emoji: '🦅', color: '#4A7BB5', bg: 'rgba(74,123,181,0.12)', desc: 'Meet the most incredible bird species' },
];

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

        {/* QR scan card */}
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

        {CATEGORIES.map(cat => (
          <div
            key={cat.key}
            className="category-card"
            onClick={() => navigate(`/animals/${cat.key}`)}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="category-icon"
              style={{ backgroundColor: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{cat.emoji}</span>
            </div>
            <div className="category-info">
              <h4 style={{ color: cat.color }}>{cat.label}</h4>
              <p>{cat.desc}</p>
            </div>
          </div>
        ))}

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
              key={String(animal.id)}
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
