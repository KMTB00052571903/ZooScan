import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Html5Qrcode } from 'html5-qrcode';
import { AppLayout } from '../layout/AppLayout';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';
import { useSpecies } from '../context/SpeciesContext';
import { getAnimalByQrCode, registerScan } from '../services/api';

export const QRScreen = () => {
  const navigate  = useNavigate();
  const { setSelectedSpecies } = useSpecies();
  const { t } = useTranslation();

  const [scanning, setScanning]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [badge, setBadge]           = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, []);

  const handleQrDetected = async (code: string) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setScanning(false);
      } catch { /* ignore cleanup */ }
    }

    try {
      const animal = await getAnimalByQrCode(code);
      const scanResult = await registerScan(code);
      if (scanResult.badge) {
        setBadge(scanResult.badge);
        setTimeout(() => setBadge(null), 4000);
      }
      setSelectedSpecies(animal);
      navigate('/animal');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('qr.notFound'));
      setLoading(false);
    }
  };

  const startScanning = async () => {
    setError(null);
    setScanning(true);

    await new Promise(r => setTimeout(r, 100));

    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText) => { void handleQrDetected(decodedText); },
        () => {}
      );
    } catch (err) {
      setScanning(false);
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('permission') || msg.includes('NotAllowed')) {
        setError(t('qr.cameraPermission'));
      } else {
        setError(t('qr.cameraError'));
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
      void handleQrDetected(manualCode.trim().toUpperCase());
    }
  };

  return (
    <AppLayout title="QR scanning">
      <div className="qr-container">
        <p className="qr-description">{t('qr.description')}</p>

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
            {t('qr.badge', { badge })}
          </div>
        )}

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

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#52b788', fontSize: '14px' }}>
            {t('qr.searching')}
          </div>
        )}

        {!loading && (
          <>
            {scanning ? (
              <div style={{ position: 'relative', marginBottom: '16px' }}>
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
                  {t('qr.cancelScan')}
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
                  {t('qr.scan')}
                </button>
              </>
            )}

            {!scanning && (
              <form onSubmit={handleManualSubmit} style={{ marginTop: '16px' }}>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  marginBottom: '8px'
                }}>
                  {t('qr.manualHint')}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={manualCode}
                    onChange={e => setManualCode(e.target.value)}
                    placeholder={t('qr.manualPlaceholder')}
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

        <div className="steps-indicator">
          <div className="step active">1</div>
          <div className="step-label active">{t('qr.step1')}</div>
          <div className="step-line"></div>
          <div className="step active">2</div>
          <div className="step-label active">{t('qr.step2')}</div>
          <div className="step-line"></div>
          <div className="step">3</div>
          <div className="step-label">{t('qr.step3')}</div>
        </div>
      </div>
    </AppLayout>
  );
};
