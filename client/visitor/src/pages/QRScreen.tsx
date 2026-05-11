import { AppLayout } from '../layout/AppLayout';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../context/useUser';
import { ZOO_CATALOG } from '../data/animals';

export const QRScreen = () => {
  const { scanAnimal } = useUser();
  const [scanResult, setScanResult] = useState<{name: string, isNew: boolean} | null>(null);

  const handleScan = () => {
    const randomAnimal = ZOO_CATALOG[Math.floor(Math.random() * ZOO_CATALOG.length)];
    const isNew = scanAnimal(String(randomAnimal.id));

    if (isNew) {
      toast.success(`🎉 New Discovery! +50 XP — ${randomAnimal.name}`);
    } else {
      toast(`Already in your collection: ${randomAnimal.name}`, { icon: '✅' });
    }

    setScanResult({ name: randomAnimal.name, isNew });
    setTimeout(() => setScanResult(null), 3000);
  };

  return (
    <AppLayout title="QR scanning">
      <div className="qr-container">
        <p className="qr-description">
          When you approach an exhibit, make sure to scan its respective QR code for special information.
        </p>

        {scanResult && (
          <div className="scan-success-alert">
            <h3 className="scan-success-title">
              {scanResult.isNew ? '🎉 New Discovery!' : '✅ Scanned!'}
            </h3>
            <p className="scan-success-xp">
              You found a {scanResult.name}.
              {scanResult.isNew ? ' +50 XP' : ' Already in your collection.'}
            </p>
          </div>
        )}

        <div className="qr-frame">
          <div className="qr-corner top-left"></div>
          <div className="qr-corner top-right"></div>
          <div className="qr-corner bottom-left"></div>
          <div className="qr-corner bottom-right"></div>
          <div className="qr-box">
            <QrCodeIcon size={80} />
          </div>
        </div>
        <button className="scan-btn" id="scanBtn" onClick={handleScan}>Scan QR Code</button>
        <div className="steps-indicator">
          <div className="step active">1</div>
          <div className="step-label active">Home</div>
          <div className="step-line"></div>
          <div className="step">2</div>
          <div className="step-label">QR Code Scanner</div>
          <div className="step-line"></div>
          <div className="step">3</div>
          <div className="step-label">Help</div>
        </div>
      </div>
    </AppLayout>
  );
};
