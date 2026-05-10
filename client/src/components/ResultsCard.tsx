import type { ScanResult } from './ScannerView';

interface ResultsCardProps {
  data: ScanResult | null;
}

export const ResultsCard = ({ data }: ResultsCardProps) => {
  if (!data) {
    return (
      <section className="card">
        <h2>Resultados</h2>
        <p>No hay datos aún</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>{data.name}</h2>
      <p>Hábitat: {data.habitat}</p>
      <p>Peligro: {data.danger}</p>
    </section>
  );
};
