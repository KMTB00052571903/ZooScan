export const ScanScreen = () => {
  return (
    <section className="scan-container">
      {/* Título */}
      <h2 className="scan-title">QR Scanning</h2>

      {/* Descripción */}
      <p className="scan-description">
        When you approach an exhibit, make sure to scan its respective QR code for special information.
      </p>

      {/* Marco del escáner */}
      <div className="scan-frame">
        <div className="scan-corner top-left"></div>
        <div className="scan-corner top-right"></div>
        <div className="scan-corner bottom-left"></div>
        <div className="scan-corner bottom-right"></div>

        <div className="scan-box">⌁</div>
      </div>
    </section>
  );
};
