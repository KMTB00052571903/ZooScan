import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { AppLayout } from '../layout/AppLayout';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';
import { useSpecies } from '../context/SpeciesContext';
import { getAnimalByQrCode, registerScan } from '../services/api';

export const QRScreen = () => {
  const navigate  = useNavigate();
  const { setSelectedSpecies } = useSpecies();

  const [scanning, setScanning]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [badge, setBadge]           = useState<string | null>(null);

  // Referencia al escáner para poder detenerlo al desmontar
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Detener la cámara limpiamente cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, []);

  // Procesa el código QR detectado: busca el animal y registra el escaneo
  const handleQrDetected = async (code: string) => {
    if (loading) return; // Evitar doble disparo
    setLoading(true);
    setError(null);

    // Detener la cámara antes de navegar
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setScanning(false);
      } catch { /* ignore cleanup errors */ }
    }

    try {
      // Obtener datos del animal desde el backend
      const animal = await getAnimalByQrCode(code);

      // Registrar el escaneo y verificar si ganó un badge
      const scanResult = await registerScan(code);
      if (scanResult.badge) {
        setBadge(scanResult.badge);
        setTimeout(() => setBadge(null), 4000);
      }

      setSelectedSpecies(animal);
      navigate('/animal');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QR no reconocido');
      setLoading(false);
    }
  };

  // Inicia el escáner de cámara con html5-qrcode
  const startScanning = async () => {
    setError(null);
    setScanning(true);

    // Esperar a que el DOM actualice y el div#qr-reader exista
    await new Promise(r => setTimeout(r, 100));

    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' }, // cámara trasera en móvil
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText) => { handleQrDetected(decodedText); },
        () => { /* frame sin QR — es normal, no loguear */ }
      );
    } catch (err) {
      setScanning(false);
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('permission') || msg.includes('NotAllowed')) {
        setError('Permiso de cámara denegado. Actívalo en la configuración del navegador.');
      } else {
        setError('No se pudo acceder a la cámara. Usa el input manual.');
      }
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch { /* ignore */ }
    }
    setScanning(false);
    setError(null);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleQrDetected(manualCode.trim().toUpperCase());
    }
  };

  return (
    <AppLayout title="QR scanning">
      <div className="qr-container">
        <p className="qr-description">
          When you approach an exhibit, make sure to scan its respective QR code for special information.
        </p>

        {/* Badge ganado */}
        {badge && (
          <div style={{
            background: 'linear-gradient(135deg, #8b5a3c, #d4a574)',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 20px',
            textAlign: 'center',
            marginBottom: '12px',
            fontWeight: 700,
            fontSize: '15px',
            boxShadow: '0 4px 20px rgba(139,90,60,0.4)'
          }}>
            🏅 ¡Badge desbloqueado: {badge}!
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.15)',
            border: '1px solid rgba(220,38,38,0.4)',
            borderRadius: '10px',
            padding: '10px',
            color: '#fca5a5',
            fontSize: '13px',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#52b788',
            fontSize: '14px'
          }}>
            🔍 Buscando información del animal...
          </div>
        )}

        {/* Frame del escáner de cámara */}
        {!loading && (
          <>
            {scanning ? (
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                {/* html5-qrcode renderiza el video dentro de este div */}
                <div id="qr-reader" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }} />
                <button
                  onClick={stopScanning}
                  style={{
                    marginTop: '12px',
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '14px'
                  }}
                >
                  ✕ Cancelar escaneo
                </button>
              </div>
            ) : (
              <>
                <div className="qr-frame">
                  <div className="qr-corner top-left"></div>
                  <div className="qr-corner top-right"></div>
                  <div className="qr-corner bottom-left"></div>
                  <div className="qr-corner bottom-right"></div>
                  <div className="qr-box">
                    <QrCodeIcon size={80} />
                  </div>
                </div>

                <button className="scan-btn" onClick={startScanning}>
                  📷 Scan QR Code
                </button>
              </>
            )}

            {/* Fallback para desktop o cuando no hay cámara */}
            {!scanning && (
              <form onSubmit={handleManualSubmit} style={{ marginTop: '16px' }}>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  marginBottom: '8px'
                }}>
                  O ingresa el código manualmente (para demo)
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={manualCode}
                    onChange={e => setManualCode(e.target.value)}
                    placeholder="Ej: ANIMAL_IGUANA_01"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    ↵
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* Steps indicator — preservado del diseño original */}
        <div className="steps-indicator">
          <div className="step active">1</div>
          <div className="step-label active">Home</div>
          <div className="step-line"></div>
          <div className="step active">2</div>
          <div className="step-label active">QR Code Scanner</div>
          <div className="step-line"></div>
          <div className="step">3</div>
          <div className="step-label">Help</div>
        </div>
      </div>
    </AppLayout>
  );
};
