import { AppLayout } from '../layout/AppLayout';
import toast from 'react-hot-toast';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SectionCard } from '../components/ui/SectionCard';
import { useSpecies } from '../context/useSpecies';
import { useFavorites } from '../context/useFavorites';

export const AnimalDetailScreen = () => {
  const { selectedSpecies } = useSpecies();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!selectedSpecies) {
    return (
      <AppLayout title="Animal Detail">
        <p className="detail-empty">No animal selected</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Animal Detail">
      <div className="detail-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <h1 className="detail-name">{selectedSpecies.name}</h1>
          <button
            onClick={() => {
              const adding = !isFavorite(selectedSpecies.id);
              void toggleFavorite(selectedSpecies).then(() =>
                toast.success(adding ? 'Added to favorites ❤️' : 'Removed from favorites')
              ).catch(() => toast.error('Failed to update favorites'));
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', lineHeight: 1, flexShrink: 0 }}
            aria-label={isFavorite(selectedSpecies.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(selectedSpecies.id) ? '❤️' : '🤍'}
          </button>
        </div>
        <img
          src={"https://upload.wikimedia.org/wikipedia/commons/0/0b/Iguana_iguana_Portoviejo_02.jpg"}
          className="detail-image"
          alt={selectedSpecies.name}
        />
        <p className="detail-description">
          {selectedSpecies.description}
        </p>
        <PrimaryButton>View AR Model</PrimaryButton>
        <SectionCard title="Habitat">
          {selectedSpecies.habitat}
        </SectionCard>

        <SectionCard title="Danger level">
          {selectedSpecies.dangerLevel}
        </SectionCard>

      </div>
    </AppLayout>
  );
};
