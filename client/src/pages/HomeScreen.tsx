import { AppLayout } from '../layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { FavoriteCard } from '../components/ui/FavoriteCard';
import { useSpecies } from '../context/useSpecies';
import type { Species } from '../models/Species';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { setSelectedSpecies } = useSpecies();

  const handleFavoriteClick = (speciesMock: Species) => {
    setSelectedSpecies(speciesMock);
    navigate('/animal');
  };

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

      </div>
    </AppLayout>
  );
};
