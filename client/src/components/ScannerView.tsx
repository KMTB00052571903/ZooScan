export interface ScanResult {
  name: string;
  habitat: string;
  danger: string;
}

interface ScannerViewProps {
  onScanComplete: (result: ScanResult) => void;
}

export const ScannerView = ({ onScanComplete }: ScannerViewProps) => {
  const handleScan = () => {
    const data: ScanResult = {
      name: 'León',
      habitat: 'Sabana',
      danger: 'Alto'
    };
    onScanComplete(data);
  };

  return (
    <section className="card">
      <h2>Escanear QR</h2>
      <button id="scanBtn" onClick={handleScan}>Simular Escaneo</button>
    </section>
  );
};
