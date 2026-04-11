import { AppLayout } from '../layout/AppLayout';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SectionCard } from '../components/ui/SectionCard';
import { useSpecies } from '../context/SpeciesContext';

export const AnimalDetailScreen = () => {
  const { selectedSpecies } = useSpecies();

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

        {/* Nombre */}
        <h1 className="detail-name">{selectedSpecies.name}</h1>

        {/* Imagen */}
        <img
          src={"https://upload.wikimedia.org/wikipedia/commons/0/0b/Iguana_iguana_Portoviejo_02.jpg"} // Usa species.image si existe
          className="detail-image"
          alt={selectedSpecies.name}
        />

        {/* Descripción */}
        <p className="detail-description">
          {selectedSpecies.description}
        </p>

        {/* Botón AR */}
        <PrimaryButton>View AR Model</PrimaryButton>

        {/* Secciones */}
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
