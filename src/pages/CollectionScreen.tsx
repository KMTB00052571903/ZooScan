import { AppLayout } from '../layout/AppLayout';
import { useUser } from '../context/UserContext';
import { ZOO_CATALOG } from '../data/animals';
import { useSpecies } from '../context/SpeciesContext';
import { useNavigate } from 'react-router-dom';

export const CollectionScreen = () => {
  const { scannedAnimals } = useUser();
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
            const isUnlocked = scannedAnimals.includes(animal.id);
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
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};
