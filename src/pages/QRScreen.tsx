import { AppLayout } from '../layout/AppLayout';

export const QRScreen = () => {
  const handleScan = () => {
    console.log('Scanning QR Code...');
    alert('Simulando escaneo de QR');
  };

  return (
    <AppLayout title="QR scanning">
      <div className="qr-container">
                <p className="qr-description">
          When you approach an exhibit, make sure to scan its respective QR code for special information.
        </p>
        <div className="qr-frame">
          <div className="qr-corner top-left"></div>
          <div className="qr-corner top-right"></div>
          <div className="qr-corner bottom-left"></div>
          <div className="qr-corner bottom-right"></div>
          <div className="qr-box">📷</div>
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
