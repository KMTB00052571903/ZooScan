import { AppLayout } from '../layout/AppLayout';
import toast from 'react-hot-toast';
import { useUser } from '../context/useUser';
import { useFavorites } from '../context/useFavorites';
import { ZOO_CATALOG } from '../data/animals';
import { useSpecies } from '../context/useSpecies';
import { useNavigate } from 'react-router-dom';

export const CollectionScreen = () => {
  const { scannedAnimals } = useUser();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { setSelectedSpecies } = useSpecies();
  const navigate = useNavigate();

  const handleAnimalClick = (animal: typeof ZOO_CATALOG[0], isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedSpecies(animal);
      navigate('/animal');
    }
  };

  return (
    <AppLayout title="My Collection">
      <div className="collection-container">
        <p className="collection-subtitle">
          Discover all the species in our zoo. Scanned animals: {scannedAnimals.length}/{ZOO_CATALOG.length}
        </p>
        
        <div className="collection-grid">
          {ZOO_CATALOG.map((animal) => {
            const isUnlocked = scannedAnimals.includes(String(animal.id));
            return (
              <div 
                key={animal.id} 
                className={`collection-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                onClick={() => handleAnimalClick(animal, isUnlocked)}
              >
                <div className="collection-image-placeholder">
                  {isUnlocked ? (
                    <span className="collection-emoji">
                      {animal.id === 'iguana' ? '🦎' : 
                       animal.id === 'lion' ? '🦁' : 
                       animal.id === 'eagle' ? '🦅' : 
                       animal.id === 'elephant' ? '🐘' : 
                       animal.id === 'penguin' ? '🐧' : 
                       animal.id === 'tiger' ? '🐅' : 
                       animal.id === 'turtle' ? '🐢' : 
                       animal.id === 'macaw' ? '🦜' : '❓'}
                    </span>
                  ) : (
                    <span className="collection-question">?</span>
                  )}
                </div>
                <div className="collection-info">
                  <h4 className="collection-name">
                    {isUnlocked ? animal.name : 'Unknown Species'}
                  </h4>
                  {isUnlocked && <p className="collection-type">{animal.habitat}</p>}
                </div>
                {isUnlocked && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      const adding = !isFavorite(animal.id);
                      void toggleFavorite(animal).then(() =>
                        toast.success(adding ? `${animal.name} added to favorites ❤️` : `${animal.name} removed from favorites`)
                      ).catch(() => toast.error('Failed to update favorites'));
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px', lineHeight: 1 }}
                    aria-label={isFavorite(animal.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite(animal.id) ? '❤️' : '🤍'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};
