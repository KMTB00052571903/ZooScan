import { AppLayout } from '../layout/AppLayout';
import toast from 'react-hot-toast';
import { useUser } from '../context/useUser';
import { useFavorites } from '../context/useFavorites';
import { ZOO_CATALOG } from '../data/animals';
import { useSpecies } from '../context/useSpecies';
import { useNavigate } from 'react-router-dom';
import type { Species } from '../models/Species';

export const CollectionScreen = () => {
  const { scannedAnimals } = useUser();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { animals, setSelectedSpecies } = useSpecies();
  const navigate = useNavigate();

  const handleAnimalClick = (animal: Species, isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedSpecies(animal);
      navigate('/animal');
    }
  };

  return (
    <AppLayout title="My Collection" backRoute="/home">
      <div className="collection-container">
        <p className="collection-subtitle">
          Discover all the species in our zoo. Scanned animals: {scannedAnimals.length}/{ZOO_CATALOG.length}
        </p>
        
        <div className="collection-grid">
          {ZOO_CATALOG.map((catalogAnimal) => {
            const dbAnimal = animals.find(a => 
              a.name.toLowerCase().includes(String(catalogAnimal.id).toLowerCase()) || 
              a.qr_code_id?.toLowerCase().includes(String(catalogAnimal.id).toLowerCase())
            );
            const animal = dbAnimal || catalogAnimal;
            const isUnlocked = scannedAnimals.includes(String(animal.id));
            return (
              <div 
                key={catalogAnimal.id} 
                className={`collection-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                onClick={() => handleAnimalClick(animal, isUnlocked)}
              >
                <div className="collection-image-placeholder">
                  {isUnlocked ? (
                    <span className="collection-emoji">
                      {catalogAnimal.id === 'iguana' ? '🦎' : 
                       catalogAnimal.id === 'lion' ? '🦁' : 
                       catalogAnimal.id === 'eagle' ? '🦅' : 
                       catalogAnimal.id === 'elephant' ? '🐘' : 
                       catalogAnimal.id === 'penguin' ? '🐧' : 
                       catalogAnimal.id === 'tiger' ? '🐅' : 
                       catalogAnimal.id === 'turtle' ? '🐢' : 
                       catalogAnimal.id === 'macaw' ? '🦜' : '❓'}
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
