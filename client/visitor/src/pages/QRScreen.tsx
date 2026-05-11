import { AppLayout } from '../layout/AppLayout';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Html5Qrcode } from 'html5-qrcode';
import { useSpecies } from '../context/useSpecies';
import { useUser } from '../context/useUser';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';

export const QRScreen = () => {
  const navigate = useNavigate();
  const { animals, setSelectedSpecies } = useSpecies();
  const { scanAnimal } = useUser();

  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<{ name: string; isNew: boolean } | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const regionId = 'qr-reader-region';

  const stopScanner = async () => {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop().catch(() => {});
    }
    setScanning(false);
  };

  const startScanner = async () => {
    if (scanning) { await stopScanner(); return; }

    const scanner = new Html5Qrcode(regionId);
    scannerRef.current = scanner;
    setScanning(true);

    try {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 200, height: 200 } },
        (decodedText) => {
          handleQrResult(decodedText);
          void stopScanner();
        },
        () => { /* suppress per-frame errors */ }
      );
    } catch {
      toast.error('Camera not available. Check permissions.');
      setScanning(false);
    }
  };

  const handleQrResult = (qrCodeId: string) => {
    const code = qrCodeId.trim();
    const animal = animals.find(a => a.qr_code_id === code || String(a.id) === code);

    if (!animal) {
      toast.error(`QR code not recognized: "${code}"`);
      return;
    }

    const isNew = scanAnimal(String(animal.id));
    setScanResult({ name: animal.name, isNew });
    setTimeout(() => setScanResult(null), 3000);

    toast[isNew ? 'success' : 'custom'](
      isNew ? `🎉 New Discovery! +50 XP — ${animal.name}` : `✅ Already in your collection: ${animal.name}`,
    );

    setSelectedSpecies(animal);
    setTimeout(() => navigate('/animal'), 1500);
  };

  const handleManualSubmit = () => {
    if (!manualCode.trim()) return;
    handleQrResult(manualCode);
    setManualCode('');
  };

  useEffect(() => { return () => { void stopScanner(); }; }, []);

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

        {/* Camera / idle frame */}
        <div className="qr-frame" style={{ position: 'relative', overflow: 'hidden', minHeight: '220px' }}>
          {/* html5-qrcode mounts its video into this div when scanning */}
          <div id={regionId} style={{ width: '100%', display: scanning ? 'block' : 'none' }} />

          {/* Default idle state: corner brackets + QR icon */}
          {!scanning && (
            <>
              <div className="qr-corner top-left" />
              <div className="qr-corner top-right" />
              <div className="qr-corner bottom-left" />
              <div className="qr-corner bottom-right" />
              <div className="qr-box">
                <QrCodeIcon size={80} />
              </div>
            </>
          )}
        </div>

        {/* Primary action button */}
        <button
          className="scan-btn"
          id="scanBtn"
          onClick={() => void startScanner()}
          style={{ background: scanning ? '#ef4444' : undefined }}
        >
          {scanning ? '⏹ Stop scan' : 'Scan QR Code'}
        </button>

        {/* Manual input for testing without a physical QR code */}
        <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '0.5rem' }}>
          <input
            type="text"
            value={manualCode}
            onChange={e => setManualCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleManualSubmit()}
            placeholder="Ej: ANIMAL_IGUANA_01"
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1.5px solid var(--glass-border)',
              background: 'var(--bg-panel)',
              color: 'var(--text-main)',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            onClick={handleManualSubmit}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              background: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label="Submit QR code"
          >
            ➤
          </button>
        </div>

        <div className="steps-indicator">
          <div className="step active">1</div>
          <div className="step-label active">Home</div>
          <div className="step-line" />
          <div className="step active">2</div>
          <div className="step-label active">QR Code Scanner</div>
          <div className="step-line" />
          <div className="step">3</div>
          <div className="step-label">Help</div>
        </div>
      </div>
    </AppLayout>
  );
};
