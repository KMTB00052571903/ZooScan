import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { ScannerView, type ScanResult } from './components/ScannerView';
import { ResultsCard } from './components/ResultsCard';
import { MapView } from './components/MapView';

function App() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
  };

  return (
    <div className="App">
      <Header />
      <main style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ScannerView onScanComplete={handleScanComplete} />
        <ResultsCard data={scanResult} />
        <MapView />
      </main>
    </div>
  );
}

export default App;
